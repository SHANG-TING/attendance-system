import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TokenInterceptor } from './interceptors';
import { LayoutModule } from './ui/layout/layout.module';

@NgModule({
  imports: [LayoutModule],
  providers: [
    {
      provide: Storage,
      useValue: sessionStorage
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `PortalCoreModule has already been loaded. Import PortalCoreModule modules in the AppModule only.`
      );
    }
  }
}
