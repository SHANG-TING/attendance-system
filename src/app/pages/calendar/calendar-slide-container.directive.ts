import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';

import {
  animationFrameScheduler,
  asyncScheduler,
  fromEvent,
  Subject
} from 'rxjs';
import {
  filter,
  map,
  observeOn,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';

import { SWIPE_DIRECTION } from './constant';
import {
  getMatrix,
  getTranslate
} from './util';

@Directive({
  selector: '[appCalendarSlideContainer]'
})
export class CalendarSlideContainerDirective implements AfterViewInit, OnDestroy {
  @Output() swipeChange = new EventEmitter<{ direction: SWIPE_DIRECTION; selectedDate?: Date }>();

  @ContentChildren('calendarSlide')
  slideList: QueryList<ElementRef>;

  @HostBinding('style.transform') transform = 'translate3d(0px, 0px, 0px)';

  private destroy$ = new Subject<any>();

  constructor(public el: ElementRef, private zone: NgZone) {}

  ngAfterViewInit(): void {
    for (const { elm, index } of this.slideList.map((el, i) => ({ elm: el.nativeElement as HTMLElement, index: i }))) {
      const translate = getTranslate(elm);

      if (!(translate instanceof Array)) {
        continue;
      }

      elm.style.transform = `translateX(${(index - 1) * 100}%)`;
      elm.style.width = '100%';
    }

    this.zone.runOutsideAngular(() => {
      this.handleDrag();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleDrag(): void {
    const element = this.el.nativeElement as HTMLElement;
    const hammerPan = new Hammer(element);
    hammerPan.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    const pan$ = fromEvent<HammerInput>(hammerPan, 'panstart panmove panend');

    const panStart$ = pan$.pipe(filter((e: HammerInput) => e.type === 'panstart'));
    const panMove$ = pan$.pipe(
      filter((e: HammerInput) => e.type === 'panmove'),
      observeOn(animationFrameScheduler)
    );
    const panEnd$ = pan$.pipe(filter((e: HammerInput) => e.type === 'panend'));

    panStart$
      .pipe(
        map(() => getMatrix(element)),
        switchMap(({ x: startX }) => {
          return panMove$.pipe(
            tap(({ deltaX, distance }) => {
              element.style.transform = `translate3d(${startX + (deltaX < 0 ? -distance : distance)}px, 0px, 0px)`;
            }),
            takeUntil(
              panEnd$.pipe(
                observeOn(asyncScheduler),
                take(1),
                map(({ deltaX, distance }) => {
                  if (deltaX !== 0 && distance > element.offsetWidth * 0.33) {
                    return deltaX > 0 ? SWIPE_DIRECTION.RIGHT : SWIPE_DIRECTION.LEFT;
                  }
                  return SWIPE_DIRECTION.INITIAL;
                }),
                tap((direction) => {
                  this.onSwipeChange(direction, element, startX);
                })
              )
            )
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public onSwipeChange(
    direction: SWIPE_DIRECTION,
    element: HTMLElement,
    startX: number,
    selectedDate: Date = null
  ): void {
    element.style.transition = `transform ${direction !== SWIPE_DIRECTION.INITIAL ? 500 : 400}ms ease-in-out`;
    element.style.transform = `translate3d(${startX + direction * -element.offsetWidth}px, 0px, 0px)`;

    if (direction !== SWIPE_DIRECTION.INITIAL) {
      setTimeout(() => {
        element.style.transition = '';
        this.noticeSwipeChange(direction, selectedDate);
      }, 600);
      return;
    }

    setTimeout(() => {
      element.style.transition = '';
    }, 500);

    this.noticeSwipeChange(direction, selectedDate);
  }

  private noticeSwipeChange(direction: SWIPE_DIRECTION, selectedDate: Date = null): void {
    this.zone.run(() => {
      this.swipeChange.emit({ direction, selectedDate });
    });
  }
}
