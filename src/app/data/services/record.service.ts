import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class RecordService {
  constructor(private http: HttpClient) { }

  getRange(startTime?: string, endTime?: string): Observable<{ startTime: string, endTime: string, remark: string }> {
    const now = new Date();
    const params = {} as any;

    if (!startTime) {
      params.startTime = formatDate(now, 'yyyy-MM-dd 00:00:00.000', 'en-us');
    }

    if (!endTime) {
      params.endTime = formatDate(now.setDate(now.getDate() + 1), 'yyyy-MM-dd 00:00:00.000', 'en-us');
    }

    return this.http.get<{ startTime: string, endTime: string, remark: string }>(`/api/records`, {
      params
    });
  }

  create(remark: string): Observable<any> {
    return this.http.post(`/api/records`, { remark });
  }
}
