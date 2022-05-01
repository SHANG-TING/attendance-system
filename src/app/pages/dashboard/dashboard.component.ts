import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RecordService } from '@attendance-system/data/services';
import { timer } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostBinding('className') className = 'd-flex justify-content-center pt-2';

  currentTime$ = timer(0, 1000).pipe(
    map(() => new Date()),
    shareReplay(1)
  );

  form = this.fb.group({ remark: [null] });

  startTime = null;
  endTime = null;

  readonly weekDay = {
    Monday: '星期一',
    Tuesday: '星期二',
    Wednesday: '星期三',
    Thursday: '星期四',
    Friday: '星期五',
    Saturday: '星期六',
    Sunday: '星期日'
  };

  hours = Array.from({ length: 24 }, (_, i) => i);
  minutes = Array.from({ length: 60 }, (_, i) => i);

  constructor(private fb: FormBuilder, private recordService: RecordService) {}

  ngOnInit(): void {
    this.reloadRangeRecord();
  }

  reloadRangeRecord(): void {
    this.recordService.getRange().subscribe(({ startTime, endTime, remark }) => {
      this.startTime = startTime;
      this.endTime = endTime;
      this.form.reset({ remark });
    });
  }

  onSubmit(): void {
    const remark = this.form.get('remark').value;
    this.recordService.create(remark).subscribe(() => {
      this.reloadRangeRecord();
      alert('Success!!');
    });
  }
}
