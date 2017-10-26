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
  
  constructor(private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if(this.authenticationService.getCurrentUser()) {
        this.userService.getUsers()
            .subscribe((resp: Response) => {
                const { userData }  = resp.json();
                this.userData = {};
                userData.forEach((user) => {
                    this.userData[user.username] = user.firstname;
                });
                this.taskService.getAssignedTasks()
                    .subscribe((resp: Response) => {
                        const { taskData }  = resp.json();
                        this.taskData = taskData
                            .map((task) => {
                                return Object.assign(task, {
                                    firstname : this.userData[task.owner]
                                })
                            })
                            .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                        console.log(this.taskData);
                    });
            });
    }
  }

}
