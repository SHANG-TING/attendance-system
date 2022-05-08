import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { AsDialogRef } from './dialog-ref';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'as-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class AsDialogComponent implements OnInit {
  contentType: 'template' | 'string' | 'component';
  content: string | TemplateRef<any> | Type<any>;
  context;

  constructor(private ref: AsDialogRef) {}

  close(): void {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        $implicit: this.ref.data,
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }
}
