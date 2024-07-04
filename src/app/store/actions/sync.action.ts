import { createAction, props } from '@ngrx/store';

export const syncData = createAction('[Sync] Sync Data');
export const syncDataSuccess = createAction('[Sync] Sync Data Success');
export const syncDataFailure = createAction(
  '[Sync] Sync Data Failure',
  props<{ error: any }>()
);
