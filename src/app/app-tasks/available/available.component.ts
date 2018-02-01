import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from '@angular/router';

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
    showProgress = false;
    cachedInitTaskData = [];

    constructor(private router: Router, private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.userData = this.authenticationService.getCurrentUser();
        /* const currentUser = this.authenticationService.getCurrentUser();
        this.userData = Object.assign({}, currentUser, {
            securityGroupName : this.userService.fromSGTosg(currentUser.securityGroupName)
        }); */
        this.userData = this.userData ? this.userData : {'username': ''}
        if(this.userData) {
            this.getAvailableTasks();
        }
    }

    getAvailableTasks() {
        this.noData = true;
        this.showProgress = true;
        this.taskService.getAvailableTasks(this.userData)
            .subscribe((resp: Response) => {
                const taskData = resp.json();
                this.taskData = taskData
                    /* .map((task) => {
                        task.status = this.taskService.fromSTATUSTostatus(task.status);
                        return task;
                    }) */
                    .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log(this.taskData);

                this.showProgress = false;
                this.cachedInitTaskData = this.taskData;
                if(this.taskData.length > 0) { this.noData = false; }
                this.taskService.refreshStats(true);
            }, (err) => {
                /* this.cachedInitTaskData = this.taskData = [
                    {
                        taskId: 1,
                        severityName: 'Critical'
                    }
                ]; */
                this.showProgress = false;
                if(this.taskData.length > 0) { this.noData = false; }
                this.taskService.refreshStats(true);
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
            }, (err) => {
                this.getAvailableTasks();
            });
    }

    getUpdateTaskData(sg) {
        if(['DEVELOPER', 'LEAD', 'MANAGER'].includes(sg)) { return { 'devUser': this.userData['username'] }; }
        else if(sg === 'OPS') { return { 'opsUser': this.userData['username'] }; }
        else if(sg === 'INTERNAL_VALIDATOR') { return { 'invUser': this.userData['username'] }; }
        else if(sg === 'EXTERNAL_VALIDATOR') { return { 'exvUser': this.userData['username'] }; }
    }

    onNotes(taskId) {
        this.router.navigate(['/tasks/notes', taskId]);
    }

    onSearch(e) {
        const search = e.target.value.split('=');
        const fieldName = search[0];
        const fieldValue = search[1];

        if(fieldName && fieldValue){
            switch (fieldName) {
                case 'severity' : {
                    this.taskData = this.cachedInitTaskData.filter((task) => {
                        return (task['severityName'] && task['severityName'].toLowerCase() === fieldValue.toLowerCase());
                    })
                }
            }
        } else {
            this.taskData = this.cachedInitTaskData;
        }

    }

}
