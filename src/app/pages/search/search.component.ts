import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { addYears } from 'date-fns';

import { Job } from '@attendance-system/data/models';
import { JobService } from '@attendance-system/data/services';
import { AsDialog } from '@attendance-system/shared/ui/dialog';

import { EventDetailDialogComponent } from '../calendar/ui/event-detail-dialog/event-detail-dialog.component';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  host: {
    class: 'd-flex flex-column h-100'
  }
})
export class SearchComponent implements OnInit {
  form = this.fb.group({
    keyword: ['']
  });

  jobs: Job[] = [];

  isLoading = false;

  constructor(private dialog: AsDialog, private fb: FormBuilder, private jobService: JobService) {}

  ngOnInit() {}

  onSearch(): void {
    const keyword = this.form.get('keyword').value;

    if (!keyword) {
      alert('關鍵字不能為空！');
      return;
    }

    this.isLoading = true;

    const now = new Date();
    this.jobService
      .getList(addYears(now, -3), now, keyword)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((jobs) => {
        if ((this.jobs = jobs).length === 0) {
          alert('查無資料！');
        }
      });
  }

  openEventDetailDialog(job: Job): void {
    this.dialog.open(EventDetailDialogComponent, job).afterClosed$.subscribe(console.log);
  }
}
