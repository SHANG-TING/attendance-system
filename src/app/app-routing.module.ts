import { NgModule } from '@angular/core';
import { async } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth';
import { LayoutComponent } from './core/ui/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: async () => (await import('./pages/dashboard/dashboard.module')).DashboardModule
      },
      {
        path: 'calendar',
        loadChildren: async () => (await import('./pages/calendar/calendar.module')).CalendarModule
      }
    ]
  },
  {
    path: 'login',
    loadChildren: async () => (await import('./pages/login/login.module')).LoginModule
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
