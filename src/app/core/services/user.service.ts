import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import firebase from 'firebase';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IUserModel } from '../../shared/models';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import UserCredential = firebase.auth.UserCredential;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;
import User = firebase.User;

@Injectable( {
	providedIn: 'root'
} )
export class UserService {

	// Used when guard is fetching state from server to show loading
	public loader$ = new BehaviorSubject<boolean>( false );


	constructor( public auth: AngularFireAuth,
				 private firestore: AngularFirestore,
				 private router: Router,
				 private storage: AngularFireStorage,
	) {
	}


	signUpEmailPassword( email, password ): Observable<UserCredential> {
		return from( this.auth.createUserWithEmailAndPassword( email, password ) );
	}


	loginWithEmail( email, password ): Observable<UserCredential> {
		return from( this.auth.signInWithEmailAndPassword( email, password ) );
	}


	loginWithGoogle(): Observable<UserCredential> {
		return from( this.auth.signInWithPopup( new GoogleAuthProvider() ) );
	}


	loginWithFacebook(): Observable<UserCredential> {
		return from( this.auth.signInWithPopup( new FacebookAuthProvider() ) );
	}


	logout(): Observable<void> {
		return from( this.auth.signOut() );
	}


	selectUser(): Observable<User> {
		return this.auth.user;
	}


	selectIsLoggedIn(): Observable<boolean> {
		return this.auth.user.pipe( map( user => !!user?.uid ) );
	}


	createUserEntry( user: IUserModel ): Observable<any> {
		return from( this.firestore.firestore.collection( 'users' ).doc( user?.uid ).set( user, { merge: true } ) );
	}


	/**
	 * Generator function, first yield gives the ref to file and second return the uploadTaskRef to listen to complete
	 *
	 * @param file
	 */
	*uploadImage( file: File ): Generator<AngularFireUploadTask | AngularFireStorageReference> {
		if ( !file ) {
			return null;
		}

		const filePath = `images/${ file?.name }`;
		const fileRef = this.storage.ref( filePath );

		yield fileRef;

		return this.storage.upload( filePath, file );
	}
}
