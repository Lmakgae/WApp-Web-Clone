import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.css']
})
export class BlockedComponent implements OnInit {

  @Output()
  closeBlockedEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeBlockedEvent.emit(true);
  }


}
