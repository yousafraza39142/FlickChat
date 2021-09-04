import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { PartialObserver, Subscription } from 'rxjs';
import firebase from 'firebase';
import { defaultProfileImage } from '../../shared/constants';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { UtilitiesService } from '../../core/services/utilities.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import AuthError = firebase.auth.AuthError;
import Persistence = firebase.auth.Auth.Persistence;


enum LayoutOptions {
	SignIn,
	SignUp,
}

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit, OnDestroy {

	// Form Controls with validators
	fc_firstName = new FormControl( '', [ Validators.required ] );
	fc_lastName = new FormControl( '' );
	fc_phoneNo = new FormControl( '' );
	fc_profilePhoto = new FormControl( defaultProfileImage );
	fc_email = new FormControl( '', [ Validators.email, Validators.required ] );
	fc_password = new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] );
	keepLoggedIn = new FormControl( false );

	// eslint-disable-next-line max-len
	photoUrl: string = defaultProfileImage;
	uploadTask: AngularFireUploadTask = null;

	// Form
	loginForm = new FormGroup( {
		email: this.fc_email,
		password: this.fc_password,
		keepLoggedIn: this.keepLoggedIn,
	} );

	// Form
	signUpForm = new FormGroup( {
		firstName: this.fc_firstName,
		lastName: this.fc_lastName,
		phoneNo: this.fc_phoneNo,
		profilePhoto: this.fc_profilePhoto,
	} );

	// Layout
	LayoutOptions = LayoutOptions;
	layout: LayoutOptions = LayoutOptions.SignIn;
	loader = false;
	percentageValue = 0;

	// Subs
	readonly subs: Subscription = new Subscription();


	constructor( private router: Router,
				 private userService: UserService,
				 private auth: AngularFireAuth,
				 private utils: UtilitiesService,
	) {
	}


	public googleSignIn(): void {
		this.subs.add( this.userService.loginWithGoogle().subscribe( this.signInObserver ) );
	}


	public facebookSignIn(): void {
		this.subs.add( this.userService.loginWithFacebook().subscribe( this.signInObserver ) );
	}


	ngOnInit(): void {
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}


	onCancel(): void {
		this.clearValues();
		this.clearErrors();
	}


	changeLayout( layout: LayoutOptions ) {

		if ( layout === LayoutOptions.SignUp ) {
			this.signUpForm.addControl( 'email', this.fc_email );
			this.signUpForm.addControl( 'password', this.fc_password );
		} else {
			this.signUpForm.removeControl( 'email' );
			this.signUpForm.removeControl( 'password' );
		}

		this.layout = layout;
	}


	onImageUrlReceived( url: string ) {
		this.photoUrl = url;
	}


	onUploadTaskReceived( uploadTask: AngularFireUploadTask ) {
		this.uploadTask = uploadTask;
		this.subs.add(
			uploadTask?.percentageChanges().subscribe( {
				next: percentage => {
					this.showLoader();
					this.signUpForm.disable();
					this.percentageValue = percentage;
				},
				complete: () => {
					this.hideLoader();
					this.signUpForm.enable();
				},
				error: err => {
					this.hideLoader();
					this.signUpForm.enable();
					this.uploadTask = null;
					this.utils.openSnackBar( err?.message, null, 3000 );
				}
			} )
		);
	}


	onCancelUpload() {
		this.uploadTask?.cancel();
		this.hideLoader();
		this.signUpForm.enable();
	}


	signUp() {
		const data = this.signUpForm.value;
		this.showLoader();
		this.signUpForm.disable();
		this.subs.add(
			this.userService.signUpEmailPassword( data?.email, data?.password ).pipe( tap( credentials => {
				this.updateSignedUpUser( credentials );
			} ) ).subscribe( {
				next: credentials => {
					this.navigateHome();
					this.hideLoader();
				},
				error: err => {
					this.showLoader();
					this.signUpForm.disable();
					this.utils.openSnackBar( err?.message );
				}
			} )
		);
	}


	async login() {
		const { email, password, keepLoggedIn } = this.loginForm.value;

		// wait before persistence is set
		await this.setPersistenceBeforeLogin( keepLoggedIn );

		this.showLoader();
		this.loginForm.disable();
		this.subs.add(
			this.userService.loginWithEmail( email, password ).subscribe( {
				next: credentials => {
					this.navigateHome();
				},
				error: err => {
					this.loginForm.enable();
					this.hideLoader();
					this.utils.openSnackBar( err?.message );
				}
			} )
		);
	}


	private updateSignedUpUser( credentials: firebase.auth.UserCredential ) {
		const { firstName, lastName } = this.signUpForm.value;
		if ( credentials?.user ) {
			credentials.user.updateProfile( { displayName: `${ firstName } ${ lastName }`, photoURL: this.photoUrl, } );
		}
	}


	private showLoader() {
		this.loader = true;
	}


	private hideLoader() {
		this.loader = false;
	}


	private async setPersistenceBeforeLogin( keepLoggedIn ) {
		if ( keepLoggedIn ) {
			await this.auth.setPersistence( Persistence.LOCAL );
		} else {
			await this.auth.setPersistence( Persistence.SESSION );
		}
	}


	private navigateHome() {
		this.router.navigate( [ 'home' ] );
	}


	// Observer Used for google/fb sign in
	private get signInObserver(): PartialObserver<UserCredential> {
		return {
			next: () => {
				this.userService.loader$.next( false );
				this.navigateHome();
			},
			error: ( error: AuthError ) => {
				console.error( error?.message );
			}
		};
	}


	private clearValues(): void {
		this.loginForm.reset();
	}


	private clearErrors(): void {
		this.fc_email.setErrors( null );
		this.fc_password.setErrors( null );
	}
}
