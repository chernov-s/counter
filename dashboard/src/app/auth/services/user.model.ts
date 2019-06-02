export interface User {
    uid?: string;
    email: string;
    photoURL?: string;
    displayName?: string;
    password?: string;
}

export interface Token {
    key: string;
}
