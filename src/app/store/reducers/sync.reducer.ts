import { createReducer, on } from '@ngrx/store';
import * as SyncActions from '../actions/sync.action';

export interface SyncState {
  syncing: boolean;
  error: any;
}

export const initialState: SyncState = {
  syncing: false,
  error: null,
};

export const syncReducer = createReducer(
  initialState,
  on(SyncActions.syncData, (state) => ({ ...state, syncing: true })),
  on(SyncActions.syncDataSuccess, (state) => ({ ...state, syncing: false })),
  on(SyncActions.syncDataFailure, (state, { error }) => ({
    ...state,
    syncing: false,
    error,
  }))
);
