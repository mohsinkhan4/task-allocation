import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './tasks/tasks.component';
import { AvailableComponent } from './available/available.component';
import { MyBinComponent } from './my-bin/my-bin.component';
import { AssignedComponent } from './assigned/assigned.component';
import { CompletedComponent } from './completed/completed.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { NotesComponent } from './notes/notes.component';

const appRoutes: Routes = [
  { path: 'tasks', component: TasksComponent, children: [
    { path: '', component: AvailableComponent },
    { path: 'available', component: AvailableComponent },
    { path: 'mybin', component: MyBinComponent },
    { path: 'assigned', component: AssignedComponent },
    { path: 'completed', component: CompletedComponent },
    { path: 'taskDetails/:taskId', component: TaskDetailsComponent },
    { path: 'notes/:taskId', component: NotesComponent }
  ]}
];
@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [ RouterModule ]
})
export class AppTasksRouterModule { }
