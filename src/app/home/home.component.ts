import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@app/core/services/user.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {SideNavActions} from '@app/shared/models';
import {UtilitiesService} from '@app/core/services/utilities.service';
import firebase from 'firebase';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

	NavDefaultState = true;
	Actions = SideNavActions;
	isDesktop$ = this.utils.isDesktop$;

	user: firebase.User = null;


	private subs: Subscription = new Subscription();

	constructor(public userService: UserService,
				private router: Router,
				private utils: UtilitiesService
	) {
		this.subs.add(
			this.userService.selectUser().subscribe(user => {
				this.user = user;
				this.userService.createUserEntry(null);
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


	iconActions($event: SideNavActions) {
		console.log($event);
	}
}
