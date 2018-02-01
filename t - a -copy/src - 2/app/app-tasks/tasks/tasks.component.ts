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
    
    constructor(private taskService: TaskService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        const currentUser =  this.authenticationService.getCurrentUser();
        this.username = currentUser.username;
        this.securityGroupName = currentUser.securityGroupName

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

}
