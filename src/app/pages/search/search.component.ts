import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { addYears } from 'date-fns';

import { JobService } from '@attendance-system/data/services';
import { Job } from '@attendance-system/data/models';

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

  constructor(private fb: FormBuilder, private jobService: JobService) {}

  ngOnInit() {}

  onSearch(): void {
    const keyword = this.form.get('keyword').value;

    if (!keyword) {
      alert('關鍵字不能為空！');
      return;
    }

    const now = new Date();
    this.jobService.getList(addYears(now, -3), now, keyword).subscribe((jobs) => {
      if ((this.jobs = jobs).length === 0) {
        alert('查無資料！');
      }
    });
  }
}
