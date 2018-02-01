import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.css']
})
export class AssignedComponent implements OnInit {

  taskData: any[];
  userData: any;
  noData;
  
  constructor(private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    /* if(this.authenticationService.getCurrentUser()) {
        this.userService.getUsers()
            .subscribe((resp: Response) => {
                const userData  = resp.json();
                this.userData = {};
                userData.forEach((user) => {
                    this.userData[user.username] = user.firstname;
                });
                this.taskService.getAssignedTasks()
                    .subscribe((resp: Response) => {
                        const taskData  = resp.json();
                        this.taskData = taskData
                            .map((task) => {
                                task.status = this.taskService.fromSTATUSTostatus(task.status);
                                return Object.assign({}, task, {
                                    firstname : this.userData[task.currentOwner]
                                })
                            })
                            .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                        console.log(this.taskData);
                    });
            });
    } */
    this.noData = true;
    this.taskService.getAssignedTasks()
        .subscribe((resp: Response) => {
            const taskData  = resp.json();
            this.taskData = taskData
                .map((task) => {
                    // task.status = this.taskService.fromSTATUSTostatus(task.status);
                    return Object.assign({}, task, {
                        firstname : task.currentOwnerFirstName
                    })
                })
                .sort((a, b) => (a.severity < b.severity ? 1 : -1));
            console.log(this.taskData);
            if(this.taskData.length > 0) { this.noData = false; }
        });
    }

}
