import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, toArray } from 'rxjs/operators';
import { Job } from '../models';

@Injectable({ providedIn: 'root' })
export class JobService {
  private cache = new Map<string, Job[]>();

  constructor(private http: HttpClient) {}

  getList(startDate: Date, endDate: Date, keyword?: string): Observable<Job[]> {
    const params = {
      startDate: formatDate(startDate, 'yyyy-MM-dd', 'en-us'),
      endDate: formatDate(endDate, 'yyyy-MM-dd', 'en-us'),
      keyword: keyword || ''
    };

    const key = JSON.stringify(params);

    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    return this.http.get<Job[]>('/api/jobs/getJoblist', { params }).pipe(
      switchMap((jobList) => jobList),
      map((job) => ({ ...job, Contact_Content: job.Contact_Content?.replace('#', ',') })),
      toArray(),
      tap((jobList) => this.cache.set(key, jobList))
    );
  }
}
