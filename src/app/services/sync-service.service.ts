// src/app/sync.service.ts
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { of, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as SyncActions from '../store/actions/sync.action';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(private storage: StorageMap) {}

  syncData(): Observable<any> {
    return this.storage.get('formData').pipe(
      switchMap((formData: any) => {
        if (formData) {
          console.log('Syncing data', formData);

          // Simulate sending formData to the server
          // Return success or failure
          return this.simulateServerCall(formData).pipe(
            map(() => {
              this.storage.delete('formData').subscribe();
              return SyncActions.syncDataSuccess();
            }),
            catchError((error) => of(SyncActions.syncDataFailure({ error })))
          );
        } else {
          return of(SyncActions.syncDataSuccess());
        }
      })
    );
  }

  private simulateServerCall(formData: any): Observable<any> {
    // Simulate a server call
    return of(formData).pipe(map(() => true));
  }
}
