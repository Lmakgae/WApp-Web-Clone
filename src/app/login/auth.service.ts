import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private webSessionDoc: AngularFirestoreDocument<{documentId: string, uid: string, sign_in_initiated: boolean}>;
  private webSessionOb: Observable<{documentId: string, uid: string, sign_in_initiated: boolean}>;
  private storeSub: Subscription;
  private rememberMe = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private afs: AngularFirestore
  ) {}

  generateDocumentId(): string {
    return this.afs.createId();
  }

  observeWebSession(docId: string): void {
    this.webSessionDoc = this.afs.doc('web_sessions/' + docId);
    this.webSessionOb = this.webSessionDoc.valueChanges();

    this.webSessionOb.subscribe(data => {
      if (data.sign_in_initiated) {
        console.log(data.sign_in_initiated);
        this.store.dispatch(new AuthActions.InitializeWebSignIn({documentId: data.documentId, uid: data.uid}));
      }
    });
  }

  changeRememberMe(state: boolean): void {
    this.rememberMe = state;
  }

  getRememberMe(): boolean {
    return this.rememberMe;
  }



}
