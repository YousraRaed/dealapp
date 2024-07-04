import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'offline-form',
    loadChildren: () =>
      import('./components/offline-form/offline-form.module').then(
        (m) => m.OfflineFormModule
      ),
  },
  { path: '', redirectTo: 'offline-form', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
