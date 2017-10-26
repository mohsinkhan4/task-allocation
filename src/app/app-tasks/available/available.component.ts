import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {

  userData: {};
  taskData: any[];

    constructor(private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.userData = this.authenticationService.getCurrentUser();
        if(this.userData) {
            this.getAvailableTasks();
        }
    }

    getAvailableTasks() {
        this.taskService.getAvailableTasks(this.userData)
            .subscribe((resp: Response) => {
                const { taskData }  = resp.json();
                this.taskData = taskData.sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log(this.taskData);
            });
    }

    onPick(taskId) {
        const p = Object.assign({
            'owner' : this.userData['username'],
            'status': 'asg'
        }, this.getUpdateTaskData(this.userData['securityGroup']));

        this.taskService.updateTask(taskId, p)
            .subscribe((r: Response) => {
                this.getAvailableTasks();
            });
    }

    getUpdateTaskData(securityGroup) {
        if(securityGroup === 'dev') { return { 'dev': this.userData['username'] }; }
        else if(securityGroup === 'ops') { return { 'ops': this.userData['username'] }; }
        else if(securityGroup === 'int') { return { 'int': this.userData['username'] }; }
        else if(securityGroup === 'ext') { return { 'ext': this.userData['username'] }; }
    }

}
