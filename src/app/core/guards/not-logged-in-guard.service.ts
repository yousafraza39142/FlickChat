import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilitiesService} from '../services/utilities.service';
import {catchError, map, take, tap} from 'rxjs/operators';
import {loggedIn} from '@angular/fire/auth-guard';

@Injectable({
	providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router,
		private utils: UtilitiesService,
	) {
	}


	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canI();
	}

	private canI(): Observable<boolean | UrlTree> {
		return this.userService.selectIsLoggedIn().pipe(take(1),map(isLoggedIn => {
			if (!isLoggedIn) {
				return true;
			}

			this.utils.openSnackBar('😓, Please Log out First.', null);
			return this.router.parseUrl('home');
		}), catchError(this.utils.catchErrorLog));
	}
}
