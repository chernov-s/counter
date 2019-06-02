import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject, from, defer, } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user$ = new BehaviorSubject<any>(false);

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.user$.next(user);
      }
      return user;
    });
  }

  getUserIdToken(): Observable<string> {
    return from(this.afAuth.auth.currentUser.getIdToken());
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  signInWithEmail(user: User, ) {
    return defer(async () => await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password));
  }

  signUpWithEmail(user: User, ) {
    return defer(async () => await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password));
  }

}
