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
    noData;

    constructor(private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.userData = this.authenticationService.getCurrentUser();
        /* const currentUser = this.authenticationService.getCurrentUser();
        this.userData = Object.assign({}, currentUser, {
            securityGroupName : this.userService.fromSGTosg(currentUser.securityGroupName)
        }); */
        if(this.userData) {
            this.getAvailableTasks();
        }
    }

    getAvailableTasks() {
        this.noData = true;
        this.taskService.getAvailableTasks(this.userData)
            .subscribe((resp: Response) => {
                const taskData = resp.json();
                this.taskData = taskData
                    .map((task) => {
                        task.status = this.taskService.fromSTATUSTostatus(task.status);
                        return task;
                    })
                    .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log(this.taskData);
                if(this.taskData.length > 0) { this.noData = false; }
            });
    }

    onPick(taskId) {
        const p = Object.assign({
            'currentOwner' : this.userData['username'],
            // 'status': this.taskService.fromstatusToSTATUS('asg')
        }, this.getUpdateTaskData(this.userData['securityGroupName']));
        console.log('* on Pick: ', p);
        this.taskService.updateTask(taskId, p)
            .subscribe((resp: Response) => {
                const { result } = resp.json();
                this.getAvailableTasks();
            });
    }

    getUpdateTaskData(sg) {
        if(['DEVELOPER', 'LEAD', 'MANAGER'].includes(sg)) { return { 'devUser': this.userData['username'] }; }
        else if(sg === 'OPS') { return { 'opsUser': this.userData['username'] }; }
        else if(sg === 'INTERNAL_VALIDATOR') { return { 'invUser': this.userData['username'] }; }
        else if(sg === 'EXTERNAL_VALIDATOR') { return { 'exvUser': this.userData['username'] }; }
    }

}
