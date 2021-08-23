import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './auth.routes';
import { SharedModule } from '../shared/shared.module';


@NgModule( {
	declarations: [
		LoginComponent,
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
} )
export class AuthModule {
}
