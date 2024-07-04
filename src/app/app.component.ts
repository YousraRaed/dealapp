import { Component } from '@angular/core';
import { SyncService } from './services/sync-service.service';
import { Store } from '@ngrx/store';
import { syncData } from './store/actions/sync.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dealapp13';
  constructor(private store: Store) {}
  ngOnInit() {
    window.addEventListener('online', () => {
      this.store.dispatch(syncData());
    });
  }
}
