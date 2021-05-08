import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsDialog } from './dialog';
import { AsDialogComponent } from './dialog.component';

@NgModule({
  declarations: [AsDialogComponent],
  imports: [CommonModule, OverlayModule],
  providers: [AsDialog],
  exports: [OverlayModule]
})
export class AsDialogModule {}
