import { Observable, Subject } from 'rxjs';

import { OverlayRef } from '@angular/cdk/overlay';

import { TemplateRef, Type } from '@angular/core';

export interface AsDialogCloseEvent<R> {
  type: 'backdropClick' | 'close';
  data: R;
}

// R = Response Data Type, T = Data passed to Modal Type
export class AsDialogRef<R = any, T = any> {
  afterClosed$ = new Subject<AsDialogCloseEvent<R>>();

  constructor(
    public overlay: OverlayRef,
    public content: string | TemplateRef<any> | Type<any>,
    public data: T // pass data to modal i.e. FormData
  ) {
    overlay.backdropClick().subscribe(() => this._close('backdropClick', null));
  }

  afterClosed(): Observable<AsDialogCloseEvent<R>> {
    return this.afterClosed$.asObservable();
  }

  close(data?: R): void {
    this._close('close', data);
  }

  private _close(type: 'backdropClick' | 'close', data: R): void {
    this.overlay.backdropElement.classList.remove('show');
    this.overlay.dispose();

    this.afterClosed$.next({
      type,
      data
    });

    this.afterClosed$.complete();
  }
}
