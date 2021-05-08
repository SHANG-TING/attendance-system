import { AccountService } from './../../data/services/account.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@attendance-system/core/auth';
import { LoginInfo } from '@attendance-system/data/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @HostBinding('className') className = 'd-flex flex-column justify-content-center align-items-center w-100';

  form = this.fb.group({
    username: [],
    password: []
  });
  loginStatus: 'Authenticating' | 'ok' | 'fail' | null = null;

  constructor(private authService: AuthService, private accountService: AccountService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.authService.removeAll();
  }

  onSubmit(loginInfo: LoginInfo): void {
    this.loginStatus = 'Authenticating';

    this.accountService.signIn(loginInfo).subscribe(({ token }) => {
      this.loginStatus = 'ok';

      setTimeout(() => {
        this.authService.setToken(token);
        this.router.navigateByUrl('/');
      }, 500);
    }, err => {
      this.loginStatus = 'fail';

      setTimeout(() => {
        this.loginStatus = null;
      }, 500);
    });
  }
}
