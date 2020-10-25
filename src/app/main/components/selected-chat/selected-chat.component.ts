import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selected-chat',
  templateUrl: './selected-chat.component.html',
  styleUrls: ['./selected-chat.component.css']
})
export class SelectedChatComponent implements OnInit {

  @Output()
  openContactInfoEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  openContactInfo(): void {
    this.openContactInfoEvent.emit(true);
  }

}
