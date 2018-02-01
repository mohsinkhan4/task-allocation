import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatDialogModule, MatDialog } from '@angular/material';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

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
import { ModalComponent } from './utils/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    SigninComponent,
    SignupComponent,
    ModalComponent
  ],
  entryComponents: [
    ModalComponent
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    // MatDialogModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0, 0, 0, 0.05)', 
        backdropBorderRadius: '10px',
        primaryColour: '#ffffff', 
        secondaryColour: '#ffffff', 
        tertiaryColour: '#ffffff'
    }),
    AppRouterModule,
    AppTasksModule,
    AppAdminModule
  ],
  providers: [ 
    //   MatDialog , 
      UserService, TaskService, AuthenticationService, EnvService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
