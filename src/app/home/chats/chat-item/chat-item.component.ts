import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.scss']
})
export class ChatItemComponent implements OnInit {

	@Input() name       : string = 'demo';
	@Input() lastSeen   : string = '8 mins ago';
	@Input() lastMessage: string = 'Hey, this is the test last message, it is supposed to be a long message';

  constructor() { }

  ngOnInit(): void {
  }

}
