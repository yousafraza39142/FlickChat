import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/guards/auth-guard.service';
import {NotLoggedInGuard} from './core/guards/not-logged-in-guard.service';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule),
		canActivate: [NotLoggedInGuard],
	},
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(module => module.HomeModule),
		canActivate: [AuthGuard],
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
