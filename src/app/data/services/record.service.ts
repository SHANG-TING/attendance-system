import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { format, addDays } from 'date-fns';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private http: HttpClient) {}

  getRange(
    startTime?: string,
    endTime?: string
  ): Observable<{ startTime: string; endTime: string; remark: string; isOverTime?: boolean }> {
    const now = new Date();
    const params = {} as any;

    if (!startTime) {
      params.startTime = format(now, 'yyyy-MM-dd 00:00:00.000');
    }

    if (!endTime) {
      params.endTime = format(addDays(now, 1), 'yyyy-MM-dd 00:00:00.000');
    }

    return this.http.get<{ startTime: string; endTime: string; remark: string }>(`/api/records`, {
      params
    });
  }

  create(data: { remark: string; attendDateTime?: string; overTime?: boolean }): Observable<any> {
    return this.http.post(`/api/records`, data);
  }
}
