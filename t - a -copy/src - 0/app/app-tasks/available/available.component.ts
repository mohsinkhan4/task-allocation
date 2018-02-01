import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {

  userData: any;
  taskData: any[];

    constructor(private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        const currentUser = this.authenticationService.getCurrentUser();
        this.userData = Object.assign({}, currentUser, {
            securityGroup : this.userService.fromSGTosg(currentUser.securityGroup)
        });
        if(this.userData) {
            this.getAvailableTasks();
        }
    }

    getAvailableTasks() {
        this.taskService.getAvailableTasks(this.userData)
            .subscribe((resp: Response) => {
                const { taskData }  = resp.json();
                this.taskData = taskData
                    .map((task) => {
                        task.status = this.taskService.fromSTATUSTostatus(task.status);
                        return task;
                    })
                    .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log(this.taskData);
            });
    }

    onPick(taskId) {
        const p = Object.assign({
            'owner' : this.userData['username'],
            // 'status': this.taskService.fromstatusToSTATUS('asg')
        }, this.getUpdateTaskData(this.userData['securityGroup']));

        this.taskService.updateTask(taskId, p)
            .subscribe((r: Response) => {
                this.getAvailableTasks();
            });
    }

    getUpdateTaskData(sg) {
        if(['dev', 'led', 'mgr'].includes(sg)) { return { 'dev': this.userData['username'] }; }
        else if(sg === 'ops') { return { 'ops': this.userData['username'] }; }
        else if(sg === 'int') { return { 'int': this.userData['username'] }; }
        else if(sg === 'ext') { return { 'ext': this.userData['username'] }; }
    }

}
