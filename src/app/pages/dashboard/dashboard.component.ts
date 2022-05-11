import { Component, HostBinding, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { format, parse, differenceInMinutes } from 'date-fns';
import { timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { RecordService } from '@attendance-system/data/services';
import { AsDialog, AsDialogRef } from '@attendance-system/shared/ui/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('editTimeTpl', { static: true }) editTimeTpl: TemplateRef<void>;
  @HostBinding('className') className = 'd-flex justify-content-center pt-2';

  currentTime$ = timer(0, 1000).pipe(
    map(() => new Date()),
    shareReplay(1)
  );

  form = this.fb.group({ remark: [null] });

  editTimeDialogRef: AsDialogRef<any, any>;
  editTimeForm = this.fb.group({ hour: [0], minute: [0], isOverTime: [false] });

  startTime: Date = null;
  endTime: Date = null;

  readonly weekDay = {
    Monday: '星期一',
    Tuesday: '星期二',
    Wednesday: '星期三',
    Thursday: '星期四',
    Friday: '星期五',
    Saturday: '星期六',
    Sunday: '星期日'
  };
  readonly hours = [19, 20, 21, 22, 23];
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
    this.recordService.getRange().subscribe(({ startTime, endTime, remark, isOverTime }) => {
      this.startTime = startTime ? new Date(startTime) : null;
      this.endTime = endTime ? new Date(endTime) : null;
      this.form.reset({ remark });

      if (differenceInMinutes(this.overTime, this.endTime) > 0) {
        this.editTimeForm.reset({ isOverTime: !!isOverTime });
      }
    });
  }

  async onSubmit(): Promise<void> {
    const data = {
      ...this.form.value
    };

    const now = new Date();

    if (this.startTime && now > this.overTime) {
      this.editTimeForm.patchValue({
        hour: now.getHours(),
        minute: now.getMinutes(),
        isOverTime: true
      });

      const isEdit = await (this.editTimeDialogRef = this.dialog.open(this.editTimeTpl, {}))
        .afterClosed()
        .toPromise();

      if (isEdit) {
        const editTimeForm = this.editTimeForm.value;

        data.isOverTime = editTimeForm.isOverTime;
        data.attendDateTime = format(
          data.isOverTime
            ? new Date(now).setHours(editTimeForm.hour, editTimeForm.minute, 0)
            : new Date(now).setHours(19, 0, 0),
          'yyyy-MM-dd HH:mm:ss'
        );
      }
    }

    this.recordService.create(data).subscribe(() => {
      this.reloadRangeRecord();
      alert('打卡成功！');
    });
  }
}
