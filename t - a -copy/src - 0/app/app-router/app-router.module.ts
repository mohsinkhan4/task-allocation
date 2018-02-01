import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PanelComponent } from '../app-admin/panel/panel.component';
import { TasksComponent } from '../app-tasks/tasks/tasks.component';
import { AvailableComponent } from '../app-tasks/available/available.component';
import { MyBinComponent } from '../app-tasks/my-bin/my-bin.component';
import { AssignedComponent } from '../app-tasks/assigned/assigned.component';
import { CompletedComponent } from '../app-tasks/completed/completed.component';

import { SigninComponent } from '../app-authentication/signin/signin.component';
import { SignupComponent } from '../app-authentication/signup/signup.component';

// import { AuthGuardService } from '../auth-guard.service'
const appRoutes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'admin', component: PanelComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
  	RouterModule
  ],
  declarations: [
  ]
})
export class AppRouterModule { }
