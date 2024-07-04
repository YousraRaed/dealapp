import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfflineFormComponent } from './offline-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [OfflineFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: OfflineFormComponent }]),
  ],
})
export class OfflineFormModule {}
