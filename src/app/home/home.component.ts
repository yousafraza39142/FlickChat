import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Actions} from '../shared/models';
import {UtilitiesService} from '../core/services/utilities.service';
import {share} from 'rxjs/operators';
import firebase from 'firebase';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	NavDefaultState = true;
	Actions         = Actions;
	isHandSet$      = this.utils.isHandSet$;

	user : firebase.User = null;


	private subs: Subscription = new Subscription();

	constructor(public userService: UserService,
				private router: Router,
				private utils: UtilitiesService
	) {
		this.subs.add(
			this.userService.getUser().subscribe(user => {
				this.user = user;
			})
		);
	}


	ngOnInit(): void {
	}


	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}


	logout(): void {
		this.userService.logout().subscribe(value => {
			this.navigateToAuth();
		});
	}


	private navigateToAuth(): void {
		this.router.navigate(['auth']);
	}


	iconActions($event: Actions) {
		console.log($event);
	}
}
