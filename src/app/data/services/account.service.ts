import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInfo } from '@attendance-system/data/models';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) { }

  signIn(loginInfo: LoginInfo): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`/api/account/signin`, loginInfo);
  }
}
