import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../login/store/auth.reducer';

export interface AppState {
  auth: fromAuth.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.AuthReducer
};
