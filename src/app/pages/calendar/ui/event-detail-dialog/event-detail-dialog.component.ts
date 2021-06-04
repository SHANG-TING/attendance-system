import { Component } from '@angular/core';
import { Job } from '@attendance-system/data/models';
import { AsDialogRef } from '@attendance-system/shared/ui/dialog';

@Component({
  selector: 'app-event-detail-dialog',
  templateUrl: './event-detail-dialog.component.html',
  styleUrls: ['./event-detail-dialog.component.scss']
})
export class EventDetailDialogComponent {
  constructor(public ref: AsDialogRef<any, Job>) {}

  get job(): Job {
    return this.ref.data;
  }
}
