import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { AuthenticationService } from '../../services/authentication.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    username;
    securityGroupName;

    newTasksCount;
    opsTasksCount;
    invTasksCount;
    exvTasksCount;
    businessValidationCount;
    liveInProdCount;
    
    constructor(private taskService: TaskService, private authenticationService: AuthenticationService) { 
        this.taskService.getStatsEventEmitter.subscribe((e) => {
            if(e) this.getStats();
        })
    }

    ngOnInit() {
        const currentUser =  this.authenticationService.getCurrentUser();
        this.username = currentUser ? currentUser.username : '';
        this.securityGroupName = currentUser ? currentUser.securityGroupName : '';

        this.getStats();
    }

    getStats() {
        this.taskService.getStats()
        .subscribe((resp: Response) => {
            const { newTasksCount, opsTasksCount, invTasksCount, exvTasksCount, businessValidationCount, liveInProdCount } = resp.json();
            this.newTasksCount = newTasksCount;
            this.opsTasksCount = opsTasksCount;
            this.invTasksCount = invTasksCount;
            this.exvTasksCount = exvTasksCount;
            this.businessValidationCount = businessValidationCount;
            this.liveInProdCount = liveInProdCount;
        });
    }

    onGetState(e) {
        console.log(e);
    }

}
