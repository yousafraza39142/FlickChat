import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase';
import {Actions} from '../shared/models';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	NavDefaultState = true;
	Actions = Actions;

	constructor(public userService: UserService, private router: Router) {
	}


	ngOnInit(): void {
	}


	logout(): void {
		this.userService.logout().subscribe(value => {
			this.navigateToAuth();
		});
	}


	get user(): Observable<firebase.User> {
		return this.userService.getUser();
	}


	private navigateToAuth(): void {
		this.router.navigate(['auth']);
	}


	iconActions($event: Actions) {
		console.log($event);
	}
}
