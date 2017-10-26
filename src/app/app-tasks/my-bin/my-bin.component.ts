import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-my-bin',
    templateUrl: './my-bin.component.html',
    styleUrls: ['./my-bin.component.css']
})
export class MyBinComponent implements OnInit {

    userData: {};
    taskData: any[];
    taskDetails: any;
  
    constructor(private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.userData = this.authenticationService.getCurrentUser();
        if(this.userData) {
            this.getMyBinTasks();
        }
    }

    getMyBinTasks() {
        this.taskService.getMyBinTasks(this.userData)
            .subscribe((resp: Response) => {
                const { taskData }  = resp.json();
                this.taskData = taskData.sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log(this.taskData);
            });
    }

    onRelease(taskId) {
        let p = {};
        if(this.userData['securityGroup'] === 'dev') p = { 'status': 'new', 'owner': '', 'dev' : '' };
        else if(this.userData['securityGroup'] === 'ops') p = { 'status': 'ops', 'owner': '', 'ops': '' };

        this.taskService.updateTask(taskId, p)
            .subscribe((r: Response) => {
                this.getMyBinTasks();
            });
    }

    onMoveToOps(taskId) {
        this.taskService.updateTask(taskId, {
            'status': 'ops',
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

  onSendBackToDeveloper(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': 'asg',
            'owner': task['dev'],
            'ops': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
  }

    onSendForValidation(taskId) {
        this.taskService.updateTask(taskId, {
            'status': 'int',
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendForExternalValidation(taskId) {
        this.taskService.updateTask(taskId, {
            'status': 'ext',
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendBackToInternalValidation(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': 'asg',
            'owner': task['int'],
            'ext': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onValidatedSuccessfully(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': 'bvd',
            'owner': task['dev']
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onComplete(taskId) {
        this.taskService.updateTask(taskId, {
            'status': 'cmp',
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

  /* onToggleDetails(taskId) {
    let s = this.taskData.find(task => {
      return task.id === taskId;
    });
    s.showDetails = !s.showDetails;
    this.taskDetails = this.taskService.getTaskDetails(taskId);
  } */

}
