import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {routing} from './home.routes';
import {SharedModule} from '../shared/shared.module';
import {ProfileViewComponent} from './profile-view/profile-view.component';
import { IconActionsComponent } from './icon-actions/icon-actions.component';

@NgModule({
	declarations: [
		HomeComponent,
		ProfileViewComponent,
  IconActionsComponent,
	],
	imports: [
		routing,
		CommonModule,
		SharedModule,
	]
})
export class HomeModule {
}
