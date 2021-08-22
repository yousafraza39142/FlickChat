import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Subscription } from 'rxjs';
import firebase from 'firebase';
import { LoggerService } from '../../core/services/logger.service';
import UserCredential = firebase.auth.UserCredential;

@Component( {
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit, OnDestroy {

	// Form Controls with validators
	email = new FormControl( '', [ Validators.email, Validators.required ] );
	password = new FormControl( '', [ Validators.required, Validators.minLength( 8 ) ] );
	keepLoggedIn = new FormControl( false );

	// Form
	loginForm = new FormGroup( {
		email: this.email,
		password: this.password,
		keepLoggedIn: this.keepLoggedIn,
	}, { updateOn: 'blur' } );

	readonly subs: Subscription = new Subscription();


	constructor( private router: Router, private userService: UserService, private loggerService: LoggerService ) {
		this.subs.add(
			this.userService.auth.authState.subscribe( isAuthenticated => {
				if ( isAuthenticated ) {
					this.router.navigate( [ 'home' ] );
				}
			} )
		);
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


	public googleSignIn(): void {
		this.subs.add( this.userService.loginWithGoogle().subscribe( this.signInObserver ) );
	}


	public facebookSignIn(): void {
		this.subs.add( this.userService.loginWithFacebook().subscribe( this.signInObserver ) );
	}


	private get signInObserver() {
		return {
			next: this.handleSuccessLogin.bind( this ),
			error: this.handleErrorLogin.bind( this ),
		};
	}


	private handleSuccessLogin( credentials: UserCredential ) {
		if ( credentials?.user ) {
			console.log( credentials?.user );
			this.router.navigate( [ 'home' ] );
		}
	}


	private handleErrorLogin( error: any ) {
		this.loggerService.error( error );
	}


	private clearValues(): void {
		this.loginForm.reset();
	}


	private clearErrors(): void {
		this.email.setErrors( null );
		this.password.setErrors( null );
	}
}
