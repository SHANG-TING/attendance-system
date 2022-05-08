import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { AsDialogRef } from './dialog-ref';
import { AsDialogComponent } from './dialog.component';

@Injectable()
export class AsDialog {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<R = any, T = any>(content: string | TemplateRef<any> | Type<any>, data: T): AsDialogRef<R> {
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'modal-dialog-scrollable', 'fade', 'justify-content-center'],
      backdropClass: ['modal-backdrop', 'show']
    });

    const overlayRef = this.overlay.create(configs);

    const dialogRef = new AsDialogRef<R, T>(overlayRef, content, data);

    const injector = this.createInjector(dialogRef, this.injector);
    const componentRef = overlayRef.attach(new ComponentPortal(AsDialogComponent, null, injector));

    setTimeout(() => {
      componentRef.location.nativeElement.parentElement.classList.add('show');
    }, 0);

    return dialogRef;
  }

  createInjector(ref: AsDialogRef, inj: Injector): Injector {
    return Injector.create({
      parent: inj,
      providers: [
        {
          provide: AsDialogRef,
          useValue: ref
        }
      ]
    });
  }
}
