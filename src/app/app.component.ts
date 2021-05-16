import {Component} from '@angular/core';
import {AuthGuard} from './core/guards/auth-guard.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'FlickChat';

	constructor(public authGuard: AuthGuard) {
	}
}
