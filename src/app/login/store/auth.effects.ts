import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';
import { User } from './auth.reducer';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthEffects {

  @Effect()
  initializeWebSessionStart: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.INITIALIZE_WEB_SESSION),
    switchMap((docId: AuthActions.InitializeWebSession) => {
      return this.aFunctions.httpsCallable('initializeWebSession')({ documentId: docId.payload.documentId })
        .pipe(
          take(1), map(data => {
            return new AuthActions.WebSessionInitialized({ documentId: docId.payload.documentId });
          })
        );
    })
  ); // Should configure what should be the response from the https function

  @Effect({dispatch: false})
  webSessionInitialized = this.actions$.pipe(
    ofType(AuthActions.WEB_SESSION_INITIALIZED),
    map((docId: AuthActions.WebSessionInitialized) => {
      this.authService.observeWebSession(docId.payload.documentId);
    })
  );

  @Effect({dispatch: true})
  initializeWebSignIn = this.actions$.pipe(
    ofType(AuthActions.INITIALIZE_WEB_SIGN_IN),
    switchMap((actionPayload: AuthActions.InitializeWebSignIn) => {
      return this.aFunctions.httpsCallable('initializeWebSignIn')
            ({documentId: actionPayload.payload.documentId, uid: actionPayload.payload.uid})
            .toPromise()
            .then(res => {
              return new AuthActions.SignIn({email: res.email, password: res.password});
            })
            .catch(error => {
              console.log(error);
            });

    })
  );

  @Effect({dispatch: true})
  signIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN),
    switchMap((actionPayload: AuthActions.SignIn) => {
      const rememberMe = this.authService.getRememberMe();
      if (rememberMe) {
        this.aAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        this.aAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      }
      return this.aAuth.signInWithEmailAndPassword(actionPayload.payload.email, actionPayload.payload.password)
        .then(onFulfilled => {
          const firebaseUser: User = {uid: onFulfilled.user.uid,
                                      email: onFulfilled.user.email,
                                      phone_number: onFulfilled.user.phoneNumber,
                                      isAnonymous: onFulfilled.user.isAnonymous,
                                      photo_url: onFulfilled.user.photoURL};
          return new AuthActions.SignInSuccess({user: firebaseUser});
        })
        .catch(onRejected => {
          return new AuthActions.SignInFailed({error: 'Failed'});
        });

    })
  );

  @Effect({dispatch: true})
  signInAnonymously = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_ANONYMOUSLY),
    switchMap(() => {
      const rememberMe = this.authService.getRememberMe();
      if (rememberMe) {
        this.aAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      } else {
        this.aAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      }
      return this.aAuth.signInAnonymously()
        .then(onFulfilled => {
          const firebaseUser: User = {uid: onFulfilled.user.uid,
                                      email: onFulfilled.user.email,
                                      phone_number: onFulfilled.user.phoneNumber,
                                      isAnonymous: onFulfilled.user.isAnonymous,
                                      photo_url: onFulfilled.user.photoURL};
          return new AuthActions.SignInSuccess({user: firebaseUser});
        })
        .catch(onRejected => {
          return new AuthActions.SignInFailed({error: 'Failed'});
        });

    })
  );

  @Effect({dispatch: false})
  signInSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_SUCCESS),
    map(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  signOut: Observable<Action> = this.actions$.pipe(
    ofType(AuthActions.SIGN_OUT),
    switchMap(() => {
      return this.aAuth.signOut()
              .then((result) => {
                console.log(result);
                return new AuthActions.SignOutSuccess();
              }).catch((err) => {
                console.log(err);
                return new AuthActions.SignOutSuccess();
              });
    })
  );

  @Effect({dispatch: false})
  signOutSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGN_OUT_SUCCESS),
    map(() => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private aFunctions: AngularFireFunctions,
    private aAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router
  ) {}
}
