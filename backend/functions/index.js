/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://dashboard-d8e03.firebaseio.com'
});
// admin.initializeApp();
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();
const db = admin.firestore();


// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req, res, next) => {
  console.log('Check if request is authorized with Firebase ID token');

  if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
      !(req.cookies && req.cookies.__session)) {
    console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
        'Make sure you authorize your request by providing the following HTTP header:',
        'Authorization: Bearer <Firebase ID Token>',
        'or by passing a "__session" cookie.');
    res.status(403).send('Unauthorized');
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    console.log('Found "Authorization" header');  
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if(req.cookies) {
    console.log('Found "__session" cookie');
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(403).send('Unauthorized');
    return;
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(cors);
app.use(cookieParser);
app.use(validateFirebaseIdToken);
app.get('/hello', (req, res) => {
  res.send(`Hello ${req.user.uid}`);
});

app.post('/counter', (req, res) => {
  const { uid, email } = req.user;
  const docRef = db.collection('counter').doc(uid);

  docRef.get()
    .then(doc => {
      let counter = 1;
      if (!doc.exists) {
        console.log('No such document!  Will create new.');
        docRef.set({ email, counter });
      } else {
        counter = getCounterForExistUser(doc.data().counter);
        docRef.set({ email, counter });
      }
      return counter;
    })
    .then(counter => {
      res.send({ counter });
      return counter;
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

app.get('/counter', (req, res) => {
  const { uid, email } = req.user;
  const docRef = db.collection('counter').doc(uid);

  docRef.get()
    .then(doc => {
      let counter = 0;
      if (!doc.exists) {
        console.log('No such document!  Will create new.');
        docRef.set({ email, counter });
      } else {
        counter = doc.data().counter;
        docRef.set({ email, counter });
      }
      return counter;
    })
    .then(counter => {
      res.send({ counter });
      return counter;
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
});

function getCounterForExistUser(counter) {
  if (typeof counter !== 'number' || counter < 0) {
    return 0;
  }
  if (counter === 0) {
    return 1;
  }
  if (counter === 1) {
    return 2;
  }
  if (counter > 1) {
    return counter = counter * 2;
  }
  return undefined;
}

// This HTTPS endpoint can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
exports.app = functions.https.onRequest(app);
