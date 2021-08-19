import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SideNavActions} from 'src/app/shared/models';

@Component({
	selector: 'app-icon-actions',
	templateUrl: './icon-actions.component.html',
	styleUrls: ['./icon-actions.component.scss']
})
export class IconActionsComponent implements OnInit {

	@Output() eventAction = new EventEmitter<SideNavActions>();

	Actions       = SideNavActions;

	/**
	 * Internal state of current action clicked, can also be used from reference in template
	 */
	currentAction = SideNavActions.CHATS;

	constructor() {
	}


	ngOnInit(): void {
	}


	action(action: SideNavActions) {
		this.currentAction = action;
		this.eventAction.emit(action);
	}


}
