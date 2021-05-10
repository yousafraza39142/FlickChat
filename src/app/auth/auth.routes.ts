import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

const routes: Routes = [{
	path: '',
	children: [
		{
			path: 'auth',
			component: LoginComponent
		},
		{
			path: '',
			component: LoginComponent,
		},
		{
			path: '**',
			redirectTo: '',
			pathMatch: 'full',
		}
	],
}];

// Export routing to be imported in auth module
export const routing = RouterModule.forChild(routes);
