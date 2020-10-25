import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import { AuthService } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private storeSub: Subscription;
  documentId = '';
  loading = false;
  error: string = null;
  rememberMe = new FormControl(true);

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.loading = authState.loading;
      this.documentId = authState.documentId;
    });
    this.documentId = this.authService.generateDocumentId();
    // this.store.dispatch(new AuthActions.InitializeWebSession({documentId: this.documentId}));
    this.rememberMe.valueChanges.subscribe(stateData => {
      console.log(stateData);
      this.authService.changeRememberMe(stateData);
    });
  }

  ngOnDestroy(): void {
    this.storeSub.unsubscribe();
  }

  onSignInAnonymously(): void{
    this.store.dispatch(new AuthActions.SignInAnonymously());
  }



}
