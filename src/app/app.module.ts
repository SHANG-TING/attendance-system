import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeTW from '@angular/common/locales/zh-Hant';
import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MOCK_SERVICES } from './data/mock';

registerLocaleData(localeTW);

@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { enable: true, direction: Hammer.DIRECTION_HORIZONTAL },
    pan: { enable: true, direction: Hammer.DIRECTION_VERTICAL },
    pinch: { enable: false },
    rotate: { enable: false }
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, HammerModule, AppRoutingModule],
  providers: [
    ...MOCK_SERVICES,
    { provide: LOCALE_ID, useValue: 'zh-Hant' },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
