import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-wallpaper',
  templateUrl: './chat-wallpaper.component.html',
  styleUrls: ['./chat-wallpaper.component.css']
})
export class ChatWallpaperComponent implements OnInit {

  @Output()
  closeChatWallpaperEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeChatWallpaperEvent.emit(true);
  }

}
