import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {from, Observable} from 'rxjs';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import User = firebase.User;
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {


	constructor(public auth: AngularFireAuth, private router: Router) {
	}


	signUp(email, password): Observable<UserCredential> {
		return from(this.auth.createUserWithEmailAndPassword(email, password));
	}


	loginWithEmail(email, password): Observable<UserCredential> {
		return from(this.auth.signInWithEmailAndPassword(email, password));
	}


	loginWithGoogle(): Observable<UserCredential> {
		return from(this.auth.signInWithPopup(new GoogleAuthProvider()));
	}


	logout(): Observable<void> {
		return from(this.auth.signOut());
	}


	getUser(): Observable<User> {
		return this.auth.user;
	}


	isLoggedIn(): Observable<boolean> {
		return this.auth.user.pipe(map(user => !!user));
	}
}
