import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Actions} from 'src/app/shared/models';

@Component({
	selector: 'app-icon-actions',
	templateUrl: './icon-actions.component.html',
	styleUrls: ['./icon-actions.component.scss']
})
export class IconActionsComponent implements OnInit {

	@Output() eventAction = new EventEmitter<Actions>();

	Actions       = Actions;

	/**
	 * Internal state of current action clicked, can also be used from reference in template
	 */
	currentAction = Actions.CHATS;

	constructor() {
	}


	ngOnInit(): void {
	}


	action(action: Actions) {
		this.currentAction = action;
		this.eventAction.emit(action);
	}


}
