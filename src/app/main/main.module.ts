import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ChatListItemComponent } from './components/chat-list-item/chat-list-item.component';
import { MessageListItemComponent } from './components/message-list-item/message-list-item.component';
import { SelectedChatComponent } from './components/selected-chat/selected-chat.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChatWallpaperComponent } from './components/chat-wallpaper/chat-wallpaper.component';
import { BlockedComponent } from './components/blocked/blocked.component';
import { HelpComponent } from './components/help/help.component';
import { NewChatComponent } from './components/new-chat/new-chat.component';
import { StarredComponent } from './components/starred/starred.component';
import { ArchivedComponent } from './components/archived/archived.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { MessageInfoComponent } from './components/message-info/message-info.component';
import { ChooseThemeDialogComponent } from './dialogs/choose-theme-dialog/choose-theme-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent, ChatListItemComponent, MessageListItemComponent, SelectedChatComponent, SettingsComponent,
    ProfileComponent, NotificationsComponent, ChatWallpaperComponent, BlockedComponent, HelpComponent,
    NewChatComponent, StarredComponent, ArchivedComponent, ContactInfoComponent, MessageInfoComponent,
    ChooseThemeDialogComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
