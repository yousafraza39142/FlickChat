import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './core/guards/logged-in.guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
		canActivate: [LoggedInGuard],
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	},
	{
		path: '**', redirectTo: 'auth', pathMatch: 'full'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
