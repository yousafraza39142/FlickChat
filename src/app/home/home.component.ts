import {Component, OnInit} from '@angular/core';
import {UserService} from '../core/services/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import firebase from 'firebase';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(public userService: UserService, private router: Router) {
		this.userService.auth.authState.subscribe(state => {
			if (!state) {
				this.navigateToAuth();
			}
		});
	}


	ngOnInit(): void {
	}


	logout(): void {
		this.userService.logout().subscribe(value => {
			console.log(value);
		});
	}


	get user(): Observable<firebase.User> {
		return this.userService.getUser();
	}


	private navigateToAuth(): void {
		this.router.navigate(['auth']);
	}
}
