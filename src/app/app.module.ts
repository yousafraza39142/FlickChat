import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {SharedModule} from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AuthModule,
		BrowserAnimationsModule,
		SharedModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
