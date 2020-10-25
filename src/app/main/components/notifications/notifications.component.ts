import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  @Output()
  closeNotificationsEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeNotificationsEvent.emit(true);
  }

}
