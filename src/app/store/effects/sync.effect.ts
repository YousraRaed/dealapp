import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SyncService } from 'src/app/services/sync-service.service';
import * as SyncActions from '../actions/sync.action';

@Injectable()
export class SyncEffects {
  constructor(private actions$: Actions, private syncService: SyncService) {}

  syncData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SyncActions.syncData),
      mergeMap(() =>
        this.syncService.syncData().pipe(
          map((action) => action),
          catchError((error) => of(SyncActions.syncDataFailure({ error })))
        )
      )
    )
  );
}
