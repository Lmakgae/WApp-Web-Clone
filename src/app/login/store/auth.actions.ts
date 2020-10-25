import { Action } from '@ngrx/store';
import { User } from './auth.reducer';

export const INITIALIZE_WEB_SESSION = '[Auth] Initialize Web Session';
export const WEB_SESSION_INITIALIZED = '[Auth] Web Session Initialized';
export const WEB_SESSION_INITIALIZATION_FAILED = '[Auth] Web Session Initialization Failed';
export const OBSERVE_WEB_SESSION = '[Auth] Observe Web Session';
export const INITIALIZE_WEB_SIGN_IN = '[Auth] Initialize Web Sign In';
export const SIGN_IN = '[Auth] Sign In';
export const SIGN_IN_ANONYMOUSLY = '[Auth] Sign In Anonymously';
export const SIGN_IN_SUCCESS = '[Auth] Sign In Success';
export const SIGN_IN_FAILED = '[Auth] Sign In Failed';
export const SIGN_OUT = '[Auth] Sign Out';
export const SIGN_OUT_SUCCESS = '[Auth] Sign Out Success';

export class InitializeWebSession implements Action {
  readonly type = INITIALIZE_WEB_SESSION;

  constructor(public payload: { documentId: string; }) { }
}

export class WebSessionInitialized implements Action {
  readonly type = WEB_SESSION_INITIALIZED;

  constructor(public payload: { documentId: string; }) { }
}

export class WebSessionInitializedFailed implements Action {
  readonly type = WEB_SESSION_INITIALIZATION_FAILED;
}

export class ObserveWebSession implements Action {
  readonly type = OBSERVE_WEB_SESSION;
}

export class InitializeWebSignIn implements Action {
  readonly type = INITIALIZE_WEB_SIGN_IN;

  constructor(public payload: { documentId: string; uid: string}) {}
}

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: { email: string; password: string}) {}
}

export class SignInAnonymously implements Action {
  readonly type = SIGN_IN_ANONYMOUSLY;
}

export class SignInSuccess implements Action {
  readonly type = SIGN_IN_SUCCESS;

  constructor(public payload: { user: User}) {}
}

export class SignInFailed implements Action {
  readonly type = SIGN_IN_FAILED;

  constructor(public payload: { error: string}) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SignOutSuccess implements Action {
  readonly type = SIGN_OUT_SUCCESS;
}

export type AuthActions =
  | InitializeWebSession
  | WebSessionInitialized
  | WebSessionInitializedFailed
  | ObserveWebSession
  | InitializeWebSignIn
  | SignIn
  | SignInAnonymously
  | SignInSuccess
  | SignInFailed
  | SignOut
  | SignOutSuccess;
