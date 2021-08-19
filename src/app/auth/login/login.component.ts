import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';
import {Subscription} from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

	// Form Controls with validators
	email        = new FormControl('', [Validators.email, Validators.required]);
	password     = new FormControl('', [Validators.required, Validators.minLength(8)]);
	keepLoggedIn = new FormControl(false);

	// Form
	loginForm = new FormGroup({
		email: this.email,
		password: this.password,
		keepLoggedIn: this.keepLoggedIn,
	}, {updateOn: 'blur'});

	readonly subs: Subscription = new Subscription();

	constructor(private router: Router, private userService: UserService) {
		this.subs.add(
			this.userService.auth.authState.subscribe(isAuthenticated => {
				if (isAuthenticated) {
					this.router.navigate(['home']);
				}
			})
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


	private clearValues(): void {
		this.loginForm.reset();
	}


	private clearErrors(): void {
		this.email.setErrors(null);
		this.password.setErrors(null);
	}


	public googleSignIn(): void {
		this.subs.add(
			this.userService.loginWithGoogle().subscribe(
				value => {
					if (value?.user) {
						this.router.navigate(['home']);
					}
				}
			)
		);
	}


	public facebookSignIn(): void {
		this.subs.add(
			this.userService.loginWithFacebook().subscribe(
				value => {
					console.log(value);
					if (value.user) {
						this.router.navigate(['home']);
					}
				}
			)
		);
	}
}
