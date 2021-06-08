import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@attendance-system/shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarSlideContainerDirective } from './calendar-slide-container.directive';
import { CalendarComponent } from './calendar.component';
import { EventDetailDialogComponent } from './ui/event-detail-dialog/event-detail-dialog.component';

const MAT_MODULES = [MatDatepickerModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatNativeDateModule];

@NgModule({
  declarations: [CalendarComponent, CalendarSlideContainerDirective, EventDetailDialogComponent],
  imports: [CommonModule, FormsModule, ...MAT_MODULES, SharedModule, CalendarRoutingModule]
})
export class CalendarModule {}
