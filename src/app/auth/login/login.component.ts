import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { PartialObserver, Subscription } from 'rxjs';
import { AuthErrorCodes, IUserModel } from '../../shared/models';
import firebase from 'firebase';
import { StaticService } from '../../core/static-services/static-service';
import { defaultProfileImage } from '../../shared/constants';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { UtilitiesService } from '../../core/services/utilities.service';
import UserCredential = firebase.auth.UserCredential;
import AuthError = firebase.auth.AuthError;
import User = firebase.User;


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
	photoUrl: string = 'https://firebasestorage.googleapis.com/v0/b/echat-172e0.appspot.com/o/dummy-profile-image.png?alt=media&token=867ac6c7-3331-4462-ab7a-3f8cb74a972a';
	uploadTask: AngularFireUploadTask = null;

	// Form
	loginForm = new FormGroup( {
		email: this.fc_email,
		password: this.fc_password,
		keepLoggedIn: this.keepLoggedIn,
	}, { updateOn: 'blur' } );

	// Form
	signUpForm = new FormGroup( {
		firstName: this.fc_firstName,
		lastName: this.fc_lastName,
		phoneNo: this.fc_phoneNo,
		profilePhoto: this.fc_profilePhoto,
		email: this.fc_email,
		password: this.fc_password,
	}, { updateOn: 'blur' } );

	// Layout
	LayoutOptions = LayoutOptions;
	layout: LayoutOptions = LayoutOptions.SignUp;
	showLoading = false;
	percentageValue = 0;

	// Subs
	readonly subs: Subscription = new Subscription();


	constructor( private router: Router,
				 private userService: UserService,
				 private utils: UtilitiesService,
	) {
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
		this.layout = layout;
	}


	onFileRefReceived( url: string ) {
		this.photoUrl = url;
	}


	onUploadTaskReceived( uploadTask: AngularFireUploadTask ) {
		this.uploadTask = uploadTask;
		this.subs.add(
			uploadTask?.percentageChanges().subscribe( {
				next: percentage => {
					this.showLoading = true;
					this.signUpForm.disable();
					this.percentageValue = percentage;
				},
				complete: () => {
					this.showLoading = false;
					this.signUpForm.enable();
				},
				error: err => {
					this.showLoading = false;
					this.signUpForm.enable();
					this.uploadTask = null;
					this.utils.openSnackBar( err?.message, null, 3000 );
				}
			} )
		);
	}


	onCancelUpload() {
		this.uploadTask?.cancel();
		this.showLoading = false;
		this.signUpForm.enable();
	}


	signUp() {
		const data = this.signUpForm.value;
		this.showLoading = true;
		this.signUpForm.disable();
		this.subs.add(
			this.userService.signUpEmailPassword( data?.email, data?.password ).subscribe( {
				next: credentials => {
					if ( credentials?.additionalUserInfo?.isNewUser ) {
						const user = StaticService.getIUserModel( credentials?.user );
						this.createUserEntry( credentials?.user );
					}
				},
				error: err => {
					this.utils.openSnackBar( err?.message );
				}
			} )
		);
	}


	createUserEntry( { uid, email }: User ) {
		const { firstName, lastName } = this.signUpForm.value;
		const user: IUserModel = {
			uid,
			email,
			displayName: `${ firstName } ${ lastName }`,
			photoURL: this.photoUrl,
			status: `Hey there I'm using Flick Chat`,
		};
		this.subs.add(
			this.userService.createUserEntry(user).subscribe( () => {
				this.router.navigate( [ 'home' ] );
			})
		);
	}


	public googleSignIn(): void {
		this.subs.add( this.userService.loginWithGoogle().subscribe( this.signInObserver ) );
	}


	public facebookSignIn(): void {
		this.subs.add( this.userService.loginWithFacebook().subscribe( this.signInObserver ) );
	}


	private get signInObserver(): PartialObserver<UserCredential> {
		return {
			next: credentials => {
				console.log( credentials );
				if ( credentials?.user ) {
					this.userService.loader$.next( true );
					const user = StaticService.getIUserModel( credentials?.user );
					this.subs.add( this.userService.createUserEntry( user ).subscribe( val => {
						this.userService.loader$.next( false );
						this.router.navigate( [ 'home' ] );
					} ) );
				}
			},
			error: ( error: AuthError ) => {
				console.error( error?.message );
			}
		};
	}


	// TODO: CHECK IF NEEDED
	private getAuthErrorMessage( code: AuthErrorCodes ): string {
		switch ( code ) {
			case AuthErrorCodes.EMAIL_EXISTS:
				return 'Account Already exists with this email';
			case AuthErrorCodes.ALREADY_EXISTS:
				return 'Account Already exists with this email on different provider';
			default:
				return 'Sign In Error';
		}
	}


	private clearValues(): void {
		this.loginForm.reset();
	}


	private clearErrors(): void {
		this.fc_email.setErrors( null );
		this.fc_password.setErrors( null );
	}
}
