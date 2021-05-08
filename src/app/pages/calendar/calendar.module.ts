import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@attendance-system/shared/shared.module';
import 'hammerjs';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarSlideContainerDirective } from './calendar-slide-container.directive';
import { CalendarComponent } from './calendar.component';
import { EventDetailDialogComponent } from './ui/event-detail-dialog/event-detail-dialog.component';

@NgModule({
  declarations: [CalendarComponent, CalendarSlideContainerDirective, EventDetailDialogComponent],
  imports: [CommonModule, CalendarRoutingModule, SharedModule]
})
export class CalendarModule {}
