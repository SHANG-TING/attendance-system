import { formatDate } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  addDays,
  endOfWeek,
  startOfWeek
} from 'date-fns';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  filter,
  map,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { Job } from '@attendance-system/data/models';
import { JobService } from '@attendance-system/data/services';
import { AsDialog } from '@attendance-system/shared/ui/dialog/dialog';

import { CalendarSlideContainerDirective } from './calendar-slide-container.directive';
import { SWIPE_DIRECTION } from './constant';
import { WeekDays } from './model';
import { WeekDay } from './model/weekday';
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

  swipeDirection$ = new BehaviorSubject<SWIPE_DIRECTION>(null);

  selectedJobList$ = this.swipeDirection$.pipe(
    filter((swipeDirection) => swipeDirection !== SWIPE_DIRECTION.INITIAL),
    map(() => calcWeekDays(this.selectedDate$.value)),
    map((weekDays) => [weekDays[0].date, weekDays.slice(-1)[0].date]),
    switchMap(([startDate, endDate]) => this.jobService.getList(startDate, endDate)),
    switchMap((jobList) =>
      this.selectedDate$.pipe(
        map((date) => formatDate(date, 'yyyy/M/d', 'en-us')),
        map((planDate) => jobList.filter((job) => job.PlanDate === planDate))
      )
    )
  );

  prevWeekDays: WeekDays = calcWeekDays(addDays(this.selectedDate$.value, -7));
  currWeekDays: WeekDays = calcWeekDays(this.selectedDate$.value);
  nextWeekDays: WeekDays = calcWeekDays(addDays(this.selectedDate$.value, 7));

  private destroy$ = new Subject<void>();

  constructor(private cd: ChangeDetectorRef, private dialog: AsDialog, private jobService: JobService) {}

  ngOnInit(): void {
    this.swipeDirection$
      .pipe(
        filter((swipeDirection) => swipeDirection !== SWIPE_DIRECTION.INITIAL),
        map(() => this.selectedDate$.value),
        takeUntil(this.destroy$)
      )
      .subscribe((date) => {
        calcWeekDays(addDays(date, -7)).forEach((weekDay, i) => (this.prevWeekDays[i] = weekDay));
        calcWeekDays(date).forEach((weekDay, i) => (this.currWeekDays[i] = weekDay));
        calcWeekDays(addDays(date, 7)).forEach((weekDay, i) => (this.nextWeekDays[i] = weekDay));

        if (this.slideContainer) {
          this.slideContainer.el.nativeElement.style.transform = 'translate3d(0, 0, 0)';
        }

        this.cd.detectChanges();
      });
  }

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

  onPrevDay(): void {
    const selectedDate = this.selectedDate$.value;
    const targetDate = addDays(selectedDate, -1);
    this.onSelect(targetDate);
  }

  onNextDay(): void {
    const selectedDate = this.selectedDate$.value;
    const targetDate = addDays(selectedDate, 1);
    this.onSelect(targetDate);
  }

  onSelect(selectedDate: Date): void {
    if (this.slideContainer.el.nativeElement.style.transform !== 'translate3d(0px, 0px, 0px)') {
      return;
    }

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
    if (direction === SWIPE_DIRECTION.INITIAL && !selectedDate) {
      return;
    }

    if (selectedDate) {
      this.selectedDate$.next(selectedDate);
    } else {
      const startDate = startOfWeek(this.selectedDate$.value);
      this.selectedDate$.next(addDays(startDate, direction === SWIPE_DIRECTION.LEFT ? 7 : -7));
    }

    this.swipeDirection$.next(direction);
  }

  openEventDetailDialog(job: Job): void {
    this.dialog.open(EventDetailDialogComponent, job).afterClosed$.subscribe(console.log);
  }

  trackByFn(index: number, el: WeekDay): string {
    return el.dateString;
  }
}
