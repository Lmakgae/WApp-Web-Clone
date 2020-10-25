import * as AuthActions from './auth.actions';

export interface User {
  uid: string;
  email: string;
  phone_number: string;
  photo_url: string;
  isAnonymous: boolean;
}

export interface State {
  documentId: string;
  user: User;
  loading: boolean;
  error: string;
}

const initialState = {
  documentId: 'no-id',
  user: null,
  loading: false,
  error: null
};

export function AuthReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.INITIALIZE_WEB_SESSION:
      return {
        ...state,
        documentId: action.payload.documentId,
        loading: true,
        error: null
      };
    case AuthActions.WEB_SESSION_INITIALIZED:
      return {
        ...state,
        loading: false,
        error: null
      };
    case AuthActions.WEB_SESSION_INITIALIZATION_FAILED:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case AuthActions.SIGN_IN:
    case AuthActions.SIGN_IN_ANONYMOUSLY:
      return {
        ...state,
        user: null,
        loading: true,
        error: null
      };
    case AuthActions.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        error: null
      };
    case AuthActions.SIGN_IN_FAILED:
      return {
        ...state,
        user: null,
        loading: false,
        error: ''
      };
    case AuthActions.SIGN_OUT:
          return {
            ...state,
            loading: true,
            error: ''
          };
    case AuthActions.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
        error: ''
      };
    default:
      return state;
  }
}
