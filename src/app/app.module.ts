import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeTW from '@angular/common/locales/zh-Hant';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MOCK_SERVICES } from './data/mock';

registerLocaleData(localeTW);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, CoreModule, AppRoutingModule],
  providers: [...MOCK_SERVICES, { provide: LOCALE_ID, useValue: 'zh-Hant' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
