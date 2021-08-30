import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../core/services/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { IUserModel, SideNavActions } from '../shared/models';
import { UtilitiesService } from '../core/services/utilities.service';
import firebase from 'firebase';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit, OnDestroy {

	NavDefaultState = true;
	Actions = SideNavActions;
	isDesktop$ = this.utils.isDesktop$;
	user: IUserModel = null;


	private subs: Subscription = new Subscription();


	constructor( public userService: UserService,
				 private router: Router,
				 private utils: UtilitiesService
	) {
		this.subs.add(
			this.userService.user$.subscribe( user => {
				this.user = user;
			} )
		);

	}


	ngOnInit(): void {
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}


	logout(): void {
		this.userService.logout().subscribe( value => {
			this.navigateToAuth();
		} );
	}


	iconActions( $event: SideNavActions ) {
		console.log( $event );
	}


	private navigateToAuth(): void {
		this.router.navigate( [ 'auth' ] );
	}
}
