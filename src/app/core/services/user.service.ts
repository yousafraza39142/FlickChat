import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';
import {from, Observable} from 'rxjs';
import firebase from 'firebase';
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import User = firebase.User;
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
	providedIn: 'root'
})
export class UserService {


	constructor(public auth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {
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


	loginWithFacebook(): Observable<UserCredential> {
		return from(this.auth.signInWithPopup(new FacebookAuthProvider()));
	}


	logout(): Observable<void> {
		return from(this.auth.signOut());
	}


	selectUser(): Observable<User> {
		return this.auth.user;
	}


	selectIsLoggedIn(): Observable<boolean> {
		return this.auth.user.pipe(map(user => !!user?.uid));
	}


	createUserEntry(user: firebase.User): void {
		if (!user) return;

		this.db.database.ref('Users').child(user.uid).set(user.displayName).then(res => {
			console.log(res);
		});
	}
}
