import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppTasksRouterModule } from './app-tasks-router.module';

import { TasksComponent } from './tasks/tasks.component';
import { AvailableComponent } from './available/available.component';
import { MyBinComponent } from './my-bin/my-bin.component';
import { AssignedComponent } from './assigned/assigned.component';
import { CompletedComponent } from './completed/completed.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AppTasksRouterModule
  ],
  declarations: [ AvailableComponent, MyBinComponent, AssignedComponent, CompletedComponent, TasksComponent ]
})
export class AppTasksModule { }
