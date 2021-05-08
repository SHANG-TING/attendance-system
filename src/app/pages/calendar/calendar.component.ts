import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AsDialog } from '@attendance-system/shared/ui/dialog/dialog';
import { addDays, endOfWeek, format, startOfWeek } from 'date-fns';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CalendarSlideContainerDirective } from './calendar-slide-container.directive';
import { SWIPE_DIRECTION } from './constant';
import { WeekDay, WeekDays } from './model';
import { EventDetailDialogComponent } from './ui/event-detail-dialog/event-detail-dialog.component';
import { getMatrix } from './util';

function calcWeekDays(date: Date): WeekDays {
  const today = new Date();
  const startDate = startOfWeek(date);

  return Array.from(Array(7).keys()).map((i) => {
    const d = addDays(startDate, i);

    return {
      date: d,
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate(),
      weekDay: d.getDay(),
      dateString: d.toDateString(),
      isToday: d.toDateString() === today.toDateString()
    };
  });
}
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  @ViewChild(CalendarSlideContainerDirective) slideContainer: CalendarSlideContainerDirective;

  selectedDate$ = new BehaviorSubject<Date>(new Date());
  selectedEvents$ = this.selectedDate$.pipe(
    map((date) =>
      Array.from(Array(10).keys()).map(() => ({
        title: `【賀欣】王嘉祥Jerry--合約半年保養`,
        workDate: format(date, 'yyyy/MM/dd'),
        address: `812高雄市小港區中亨街48號`
      }))
    )
  );

  swipeDirection$ = new BehaviorSubject<SWIPE_DIRECTION>(null);

  prevWeekDays$ = this.swipeDirection$.pipe(
    filter((swipeDirection) => swipeDirection !== SWIPE_DIRECTION.INITIAL),
    map(() => addDays(this.selectedDate$.value, -7)),
    map(calcWeekDays)
  );
  currWeekDays$ = this.swipeDirection$.pipe(
    filter((swipeDirection) => swipeDirection !== SWIPE_DIRECTION.INITIAL),
    map(() => this.selectedDate$.value),
    map(calcWeekDays)
  );
  nextWeekDays$ = this.swipeDirection$.pipe(
    filter((swipeDirection) => swipeDirection !== SWIPE_DIRECTION.INITIAL),
    map(() => addDays(this.selectedDate$.value, 7)),
    map(calcWeekDays)
  );

  constructor(private dialog: AsDialog) {}

  ngOnInit(): void {}

  onPrev(): void {
    const element = this.slideContainer.el.nativeElement;
    const { x: startX } = getMatrix(element);
    this.slideContainer.onSwipeChange(SWIPE_DIRECTION.RIGHT, element, startX);
  }

  onNext(): void {
    const element = this.slideContainer.el.nativeElement;
    const { x: startX } = getMatrix(element);
    this.slideContainer.onSwipeChange(SWIPE_DIRECTION.LEFT, element, startX);
  }

  onSelect(selectedDate: Date): void {
    const startDate = startOfWeek(this.selectedDate$.value);
    const endDate = endOfWeek(this.selectedDate$.value);

    let direction = SWIPE_DIRECTION.INITIAL;

    if (selectedDate < startDate) {
      direction = SWIPE_DIRECTION.RIGHT;
    } else if (selectedDate > endDate) {
      direction = SWIPE_DIRECTION.LEFT;
    }

    const element = this.slideContainer.el.nativeElement;
    const { x: startX } = getMatrix(element);

    this.slideContainer.onSwipeChange(direction, element, startX, selectedDate);
  }

  onSelectToday(): void {
    this.onSelect(new Date());
  }

  onSwipeChange({ direction, selectedDate }: { direction: SWIPE_DIRECTION; selectedDate?: Date }): void {
    if (selectedDate) {
      this.selectedDate$.next(selectedDate);
    } else {
      const startDate = startOfWeek(this.selectedDate$.value);
      this.selectedDate$.next(addDays(startDate, direction === SWIPE_DIRECTION.LEFT ? 7 : -7));
    }

    this.swipeDirection$.next(direction);
  }

  openEventDetailDialog(): void {
    this.dialog.open(EventDetailDialogComponent, {}).afterClosed$.subscribe(console.log);
  }

  trackByFn(index: number, el: WeekDay): string {
    return el.dateString;
  }
}
