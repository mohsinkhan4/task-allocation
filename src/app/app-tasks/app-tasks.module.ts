import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { AppTasksRouterModule } from './app-tasks-router.module';

import { TasksComponent } from './tasks/tasks.component';
import { AvailableComponent } from './available/available.component';
import { MyBinComponent } from './my-bin/my-bin.component';
import { AssignedComponent } from './assigned/assigned.component';
import { CompletedComponent } from './completed/completed.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NotesComponent } from './notes/notes.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppTasksRouterModule,
        LoadingModule.forRoot({
            animationType: ANIMATION_TYPES.threeBounce,
            backdropBackgroundColour: 'rgba(0, 0, 0, 0.05)', 
            backdropBorderRadius: '10px',
            primaryColour: '#ffffff', 
            secondaryColour: '#ffffff', 
            tertiaryColour: '#ffffff'
        })
    ],
    declarations: [ 
        TasksComponent, AvailableComponent, MyBinComponent, AssignedComponent, CompletedComponent, TaskDetailsComponent,
        NotesComponent
    ]
})
export class AppTasksModule { }
