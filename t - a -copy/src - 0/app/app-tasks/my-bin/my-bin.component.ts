import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { MatDialog } from '@angular/material';

import { UserService } from '../../services/user.service';
import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ModalComponent } from '../../utils/modal/modal.component';

@Component({
    selector: 'app-my-bin',
    templateUrl: './my-bin.component.html',
    styleUrls: ['./my-bin.component.css']
})
export class MyBinComponent implements OnInit {

    userData: any;
    taskData: any[];
    taskDetails: any;
  
    constructor(private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService, public dialog: MatDialog) { }

    ngOnInit() {
        const currentUser = this.authenticationService.getCurrentUser();
        this.userData = Object.assign({}, currentUser, {
            securityGroup : this.userService.fromSGTosg(currentUser.securityGroup)
        });
        if(this.userData) {
            this.getMyBinTasks();
        }
    }

    getMyBinTasks() {
        this.taskService.getMyBinTasks(this.userData)
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

    onRelease(taskId) {
        let p = {};
        const sg = this.userData['securityGroup'];
        if(['dev', 'led', 'mgr'].includes(sg)) {
            p = { 
                'status': this.taskService.fromstatusToSTATUS('new'), 
                'owner': '', 
                'dev' : '' 
            };
        }
        else if(sg === 'ops') {
            p = { 
                'status': this.taskService.fromstatusToSTATUS('ops'), 
                'owner': '', 
                'ops': '' 
            };
        }

        this.taskService.updateTask(taskId, p)
            .subscribe((r: Response) => {
                this.getMyBinTasks();
            });
    }

    onMoveToOps(taskId) {
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('ops'),
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendBackToDeveloper(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('new'),
            'owner': task['dev'],
            'ops': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendForValidation(taskId) {
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('int'),
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendForExternalValidation(taskId) {
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('ext'),
            'owner': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendBackToInternalValidation(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('int'),
            'owner': task['int'],
            'ext': ''
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onValidatedSuccessfully(taskId) {
        const task = this.taskService.getTask(this.taskData, taskId);
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('bvd'),
            'owner': task['dev']
        }).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onComplete(taskId) {
        this.taskService.updateTask(taskId, {
            'status': this.taskService.fromstatusToSTATUS('cmp'),
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

    onExpand(taskId) {
        this.taskService.getTaskDetails(taskId)
            .subscribe((resp: Response) => {
                const { taskData }  = resp.json();
                let dialogRef = this.dialog.open(ModalComponent, {
                    width: '1000px',
                    data: { taskData }
                });
        
                dialogRef.afterClosed().subscribe((result) => {
                    console.log('The dialog was closed');
                });
            });
    }

}
