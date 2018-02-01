import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppTasksRouterModule } from './app-tasks-router.module';

import { TasksComponent } from './tasks/tasks.component';
import { AvailableComponent } from './available/available.component';
import { MyBinComponent } from './my-bin/my-bin.component';
import { AssignedComponent } from './assigned/assigned.component';
import { CompletedComponent } from './completed/completed.component';
import { TaskDetailsComponent } from './task-details/task-details.component';

@NgModule({
    imports: [
        CommonModule,
        AppTasksRouterModule
    ],
    declarations: [ 
        TasksComponent, AvailableComponent, MyBinComponent, AssignedComponent, CompletedComponent, TaskDetailsComponent 
    ]
})
export class AppTasksModule { }
