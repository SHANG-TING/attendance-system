import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeTW from '@angular/common/locales/zh-Hant';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment as env } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AccountServiceMock, RecordServiceMock } from './data/mock';
import { AccountService, RecordService } from './data/services';

registerLocaleData(localeTW);

const MOCK_SERVICES =
  (true && [
    {
      provide: AccountService,
      useValue: AccountServiceMock
    },
    {
      provide: RecordService,
      useValue: RecordServiceMock
    }
  ]) ||
  [];
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CoreModule, AppRoutingModule],
  providers: [...MOCK_SERVICES, { provide: LOCALE_ID, useValue: 'zh-Hant' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
