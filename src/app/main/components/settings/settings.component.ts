import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseThemeDialogComponent } from '../../dialogs/choose-theme-dialog/choose-theme-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Output() closeSettingsEvent = new EventEmitter<boolean>();
  @Output() openProfileEvent = new EventEmitter<boolean>();
  @Output() openNotificationsEvent = new EventEmitter<boolean>();
  @Output() openChatWallpaperEvent = new EventEmitter<boolean>();
  @Output() openBlockedConEvent = new EventEmitter<boolean>();
  @Output() openHelpConEvent = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.closeSettingsEvent.emit(true);
  }

  openProfile(): void {
    this.openProfileEvent.emit(true);
  }

  openChooseThemeDialog(): void {
    const dialogRef = this.dialog.open(ChooseThemeDialogComponent, {
      width: '400px'
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  openNotifications(): void {
    this.openNotificationsEvent.emit(true);
  }

  openChatWallpaper(): void {
    this.openChatWallpaperEvent.emit(true);
  }

  openBlockedCon(): void {
    this.openBlockedConEvent.emit(true);
  }

  openHelpCon(): void {
    this.openHelpConEvent.emit(true);
  }

}
