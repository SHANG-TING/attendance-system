import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Job } from '../models';
import { environment } from './../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  private cache = new Map<string, Job[]>();

  constructor(private http: HttpClient) {}

  getList(startDate: Date, endDate: Date): Observable<Job[]> {
    const params = {
      startDate: formatDate(startDate, 'yyyy-MM-dd', 'en-us'),
      endDate: formatDate(endDate, 'yyyy-MM-dd', 'en-us')
    };

    const key = JSON.stringify(params);

    if (this.cache.has(key)) {
      return of(this.cache.get(key));
    }

    return this.http.get<Job[]>('/api/jobs/getJoblist', { params }).pipe(
      catchError((err) =>
        iif(
          () => environment.production,
          throwError(err),
          of([
            {
              Worker: '蔡侑廷Billy',
              EQ_ID: 'T257',
              CustomerName: '順達興企業股份有限公司',
              Unit_Name: '總公司',
              Address: '500 彰化市寶廍里寶聖路125號',
              ContactName: '黃添榮',
              Contact_Content: '04-722-9977',
              EQ_Model: 'SEA1000AII',
              Job: '合約年度保養',
              Solution: 'NULL',
              PlanDate: '2021/1/6',
              MfeDate: '2009/2/18',
              Remarks: 'NULL',
              NoteCustomer: 'NULL',
              NoteEngineer: 'NULL'
            }
          ])
        )
      ),
      tap((jobList) => this.cache.set(key, jobList))
    );
  }
}
