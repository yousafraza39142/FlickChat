import {Component, Input, OnInit} from '@angular/core';

@Component({
	selector: 'app-profile-image',
	templateUrl: './profile-image.component.html',
	styleUrls: ['./profile-image.component.scss']
})
export class ProfileImageComponent implements OnInit {

	@Input() imageUrl: string  = null;
	@Input() online  : boolean = false;

	constructor() {
	}

	ngOnInit(): void {
	}

}
