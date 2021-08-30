import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { UtilitiesService } from '../services/utilities.service';
import { catchError, map, take } from 'rxjs/operators';

@Injectable( {
	providedIn: 'root'
} )
export class NotLoggedInGuard implements CanActivate {

	constructor(
		private userService: UserService,
		private router: Router,
		private utils: UtilitiesService,
	) {
	}


	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.canIActivate();
	}


	private canIActivate(): Observable<boolean | UrlTree> {
		return this.userService.selectIsLoggedIn().pipe( take( 1 ), map( isLoggedIn => {
			if ( !isLoggedIn ) {
				return true;
			}

			this.utils.openSnackBar( '😓, Please Log out First.', null );
			return this.router.parseUrl( 'home' );
		} ), catchError( this.utils.catchErrorLog ) );
	}
}
