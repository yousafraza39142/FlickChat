import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {routing} from './home.routes';
import {SharedModule} from '../shared/shared.module';


@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		routing,
		CommonModule,
		SharedModule,
	]
})
export class HomeModule {
}
