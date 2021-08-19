import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilitiesService} from '../services/utilities.service';
import {catchError, map, take, tap} from 'rxjs/operators';
import {loggedIn} from '@angular/fire/auth-guard';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

	// Used when guard is fetching state from server to show loading
	public loader$ = new BehaviorSubject<boolean>(false);

	constructor(
		private userService: UserService,
		private router: Router,
		private utils: UtilitiesService,
	) {
	}


	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canActivateAnything();
	}


	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canActivateAnything();
	}


	private canActivateAnything(): Observable<boolean | UrlTree> {
		this.loader$.next(true);
		return this.userService.selectIsLoggedIn().pipe(take(1),map(isLoggedIn => {
			this.loader$.next(false);

			if (isLoggedIn) {
				return true;
			}
			this.utils.openSnackBar('😓, Please Log in First.', null);
			return this.router.parseUrl('auth');
		}), catchError(this.utils.catchErrorLog));
	}
}
