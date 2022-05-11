import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@attendance-system/shared/shared.module';

import { SearchComponent } from './search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: SearchComponent }])
  ],
  exports: [],
  declarations: [SearchComponent ],
  providers: []
})
export class SearchModule {}
