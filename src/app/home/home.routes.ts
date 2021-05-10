import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [{
	path: '',
	children: [
		{
			path: '',
			component: HomeComponent,
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
