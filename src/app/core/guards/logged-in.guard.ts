import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilitiesService} from '../services/utilities.service';
import {catchError, tap} from 'rxjs/operators';
import {loggedIn} from '@angular/fire/auth-guard';

@Injectable({
	providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild {

	constructor(
		private userService: UserService,
		private router: Router,
		private utils: UtilitiesService,
	) {
	}


	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		// _TODO: Implement LoggedIn logic
		return this.canActivateAnything();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canActivateAnything();
	}


	canActivateAnything(): Observable<boolean> {
		return this.userService.isLoggedIn().pipe(tap(isLoggedIn => {
			console.log(isLoggedIn);
			if (isLoggedIn) {
				return true;
			}

			this.utils.openSnackBar('No User Found 😭, Logging Out', null);
			return this.router.parseUrl('auth');
		}), catchError(r => {
			// TODO: Replace with own logger service in future
			console.error('AUTH-GUARD', r);
			return of(false);
		}));
	}
}
