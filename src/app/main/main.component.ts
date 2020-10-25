import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../login/store/auth.actions';
import { Subscription } from 'rxjs';
import { User } from '../login/store/auth.reducer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {

  items = [1, 2, 3, 4, 5, 6, 7, 8];
  selectedChat = '';
  profileConToggle = false;
  contactInfoToggle = false;
  settingsToggle = false;
  notificationsToggle = false;
  chatWallpaperToggle = false;
  blockedConToggle = false;
  helpConToggle = false;
  profileClasses = {
    profileCon: true,
    profileLeft: !this.settingsToggle,
    profileRight: this.settingsToggle,
    profileActive: this.profileConToggle };
  searchFocus = false;
  searchFormControl = new FormControl();
  authStoreSub: Subscription;
  user: User;

  constructor(
    private store: Store<fromApp.AppState>
  ) {
    this.authStoreSub = this.store.select('auth').subscribe(authState => {
      this.user = authState.user;
    });
  }

  ngOnInit(): void {
    this.profileClasses = {
      profileCon: true,
      profileLeft: !this.settingsToggle,
      profileRight: this.settingsToggle,
      profileActive: this.profileConToggle,
    };
  }

  select(): void {
    this.selectedChat = 'id';
  }

  toggleProfileCon(): void {
    this.profileConToggle = !this.profileConToggle;
    this.profileClasses = {
      profileCon: true,
      profileLeft: !this.settingsToggle,
      profileRight: this.settingsToggle,
      profileActive: this.profileConToggle,
    };
  }

  toggleContactInfo(): void {
    this.contactInfoToggle = !this.contactInfoToggle;
  }

  toggleSettings(): void {
    this.settingsToggle = !this.settingsToggle;
  }

  toggleNotifications(): void {
    this.notificationsToggle = !this.notificationsToggle;
  }

  toggleChatWallpaper(): void {
    this.chatWallpaperToggle = !this.chatWallpaperToggle;
  }

  toggleBlockedCon(): void {
    this.blockedConToggle = !this.blockedConToggle;
  }

  toggleHelpCon(): void {
    this.helpConToggle = !this.helpConToggle;
  }

  searchOnFocus(): void {
    if (!this.searchFocus) {
      this.searchFocus = true;
    }
  }

  searchOnBlur(): void {
    if (!this.searchFormControl.value) {
      this.searchFocus = false;
    }
  }

  clearSearch(): void {
    this.searchFormControl.setValue('');
    this.searchFocus = false;
  }

  logout(): void {
    this.store.dispatch(new AuthActions.SignOut());
  }

}
