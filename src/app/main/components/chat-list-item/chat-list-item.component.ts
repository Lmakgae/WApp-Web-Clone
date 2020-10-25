import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-list-item',
  templateUrl: './chat-list-item.component.html',
  styleUrls: ['./chat-list-item.component.css']
})
export class ChatListItemComponent implements OnInit {

  @Input()
  displayName: string;
  @Input()
  displayText: string;
  @Input()
  displayDate: string;
  @Input()
  displayPicture: string;

  chatTextDisplayStyles: {};

  constructor() {
    this.chatTextDisplayStyles = {
      'width': true ? '' : true ? '' : '',
    };
   }

  ngOnInit(): void {
  }

}
