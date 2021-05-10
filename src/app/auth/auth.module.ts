import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '../shared/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {routing} from './auth.routes';
import {SignInComponent} from './sign-in/sign-in.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
	declarations: [
		LoginComponent,
		SignInComponent
	],
	exports: [
		LoginComponent
	],
	imports: [
		routing,
		CommonModule,
		ReactiveFormsModule,
		SharedModule,
	]
})
export class AuthModule {
}
