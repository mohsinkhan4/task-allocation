import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class CompletedComponent implements OnInit {

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
                    this.taskService.getCompletedTasks()
                        .subscribe((resp: Response) => {
                            const { taskData }  = resp.json();
                            this.taskData = taskData
                                .map((task) => {
                                    task.status = this.taskService.fromSTATUSTostatus(task.status);
                                    return Object.assign(task, {
                                        firstname : this.userData[task.dev]
                                    });
                                })
                                .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                            console.log(this.taskData);
                        });
                });
        }
    }

}
