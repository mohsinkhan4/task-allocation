import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRouterModule } from './app-router/app-router.module';
import { AppTasksModule } from './app-tasks/app-tasks.module';
import { AppAdminModule } from './app-admin/app-admin.module';

import { UserService } from './services/user.service';
import { TaskService } from './services/task.service';
import { AuthenticationService } from './services/authentication.service';
import { EnvService } from './services/env.service';

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SigninComponent } from './app-authentication/signin/signin.component';
import { SignupComponent } from './app-authentication/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule,
    AppTasksModule,
    AppAdminModule
  ],
  providers: [ UserService, TaskService, AuthenticationService, EnvService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
