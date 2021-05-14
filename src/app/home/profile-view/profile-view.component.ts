import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-profile-view',
	templateUrl: './profile-view.component.html',
	styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

	@Input() imageUrl: string = null;
	@Input() isOnline: boolean = true;
	@Input() userName: string = '---';

	constructor() {
	}

	ngOnInit(): void {
	}

}
