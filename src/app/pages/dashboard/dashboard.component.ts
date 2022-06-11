import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { differenceInMinutes, format } from 'date-fns';
import { timer } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';

import { RecordService } from '@attendance-system/data/services';
import { AsDialog, AsDialogRef } from '@attendance-system/shared/ui/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('editTimeTpl', { static: true }) editTimeTpl: TemplateRef<void>;
  @HostBinding('className') className = 'd-flex justify-content-center pt-2 h-100 overflow-auto';

  currentTime$ = timer(0, 1000).pipe(
    map(() => new Date()),
    shareReplay(1)
  );

  form = this.fb.group({ remark: [null] });

  editTimeDialogRef: AsDialogRef<any, any>;
  editTimeForm = this.fb.group({ hour: [0], minute: [0], overTime: [false] });

  startTime: Date = null;
  endTime: Date = null;

  minutes$ = this.editTimeForm.get('hour').valueChanges.pipe(
    startWith(19),
    map((hour) => +hour),
    tap((hour) => hour === 19 && this.editTimeForm.get('minute').setValue(0)),
    map((hour) => (hour === 19 ? [0] : this.minutes))
  );

  readonly weekDay = {
    Monday: '星期一',
    Tuesday: '星期二',
    Wednesday: '星期三',
    Thursday: '星期四',
    Friday: '星期五',
    Saturday: '星期六',
    Sunday: '星期日'
  };
  readonly hours = Array.from({ length: 12 }, (_, i) => i + 8);
  readonly minutes = Array.from({ length: 60 }, (_, i) => i);

  constructor(
    private fb: FormBuilder,
    private recordService: RecordService,
    private dialog: AsDialog
  ) {}

  get overTime(): Date {
    return new Date(new Date().setHours(19, 0, 0));
  }

  ngOnInit(): void {
    this.reloadRangeRecord();
  }

  reloadRangeRecord(): void {
    this.recordService.getRange().subscribe(({ startTime, endTime, remark, overTime }) => {
      this.startTime = startTime ? new Date(startTime) : null;
      this.endTime = endTime ? new Date(endTime) : null;
      this.form.reset({ remark });

      if (differenceInMinutes(this.overTime, this.endTime) > 0) {
        this.editTimeForm.reset({ overTime: !!overTime });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const now = new Date();
    const data = {
      ...this.form.value,
      attendDateTime: null
    };

    if (format(this.startTime, 'HH:mm:ss') !== '00:00:00' && now > this.overTime) {
      this.editTimeForm.patchValue({
        hour: 19,
        minute: 0,
        overTime: false
      });

      (this.editTimeDialogRef = this.dialog.open(this.editTimeTpl, {}))
        .afterClosed()
        .subscribe(({ data: isEdit }) => {
          if (isEdit) {
            const { hour, minute, overTime } = this.editTimeForm.value;

            data.attendDateTime = format(
              overTime ? now : new Date(now).setHours(hour, minute, 0),
              `yyyy-MM-dd HH:mm:ss.000`
            );
            data.overTime = overTime;

            this.recordService.create(data).subscribe(() => {
              this.reloadRangeRecord();
              alert('打卡成功！');
            });
          }
        });

      return;
    }

    this.recordService.create(data).subscribe(() => {
      this.reloadRangeRecord();
      alert('打卡成功！');
    });
  }
}
