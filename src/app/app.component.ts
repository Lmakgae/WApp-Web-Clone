import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { AuthService } from './login/auth.service';
import * as AuthActions from './login/store/auth.actions';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wapp-clone';

  constructor(
    private store: Store<fromApp.AppState>,
    private afs: AngularFirestore,
    private aAuth: AngularFireAuth,
    private authService: AuthService
  ) {
  }
}
