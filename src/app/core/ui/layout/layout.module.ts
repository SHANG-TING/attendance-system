import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainViewComponent } from '../main-view/main-view.component';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, TopBarComponent, MainViewComponent],
  imports: [CommonModule, RouterModule],
  exports: [LayoutComponent]
})
export class LayoutModule {}
