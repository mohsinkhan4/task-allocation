import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material';

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
    noData;
    showProgress = false;
  
    constructor(private router: Router, private userService: UserService, private taskService: TaskService, private authenticationService: AuthenticationService, 
        // public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.userData = this.authenticationService.getCurrentUser();
        /* const currentUser = this.authenticationService.getCurrentUser();
        this.userData = Object.assign({}, currentUser, {
            securityGroupName : this.userService.fromSGTosg(currentUser.securityGroupName)
        }); */
        this.userData = this.userData ? this.userData : {username: ''}
        if(this.userData) {
            console.log('****' + JSON.stringify(this.userData) + '****');
            this.getMyBinTasks();
        }
    }

    getMyBinTasks() {
        this.noData = true;
        this.showProgress = true;
        this.taskService.getMyBinTasks(this.userData)
            .subscribe((resp: Response) => {
                this.showProgress = false;
                const taskData  = resp.json();
                this.taskData = taskData
                    /* .map((task) => {
                        task.status = this.taskService.fromSTATUSTostatus(task.status);
                        return task;
                    }) */
                    .sort((a, b) => (a.severity < b.severity ? 1 : -1));
                console.log('* taskData in my-bin: ', this.taskData);
                if(this.taskData.length > 0) { this.noData = false; }
                this.taskService.refreshStats(true);
            }, (err) => {
                this.showProgress = false;
                /* this.taskData = [
                    {
                        taskId: 1
                    }
                ]; */
            });
    }

    onRelease(taskId, currentOwnerSecurityGroup) {
        let p = {};
        // const sg = this.userData['securityGroupName'];
        if(['DEVELOPER', 'LEAD', 'MANAGER'].includes(currentOwnerSecurityGroup)) {
            p = { 
                'status': 'NEW', 
                'currentOwner': '', 
                'devUser' : '' 
            };
        }
        else if(currentOwnerSecurityGroup === 'OPS') {
            p = { 
                'status': 'PENDING_ON_OPS', 
                'currentOwner': '', 
                'opsUser': '' 
            };
        }
        console.log('* on onRelease: ', p);
        this.taskService.updateTask(taskId, p)
            .subscribe((r: Response) => {
                this.getMyBinTasks();
            });
    }

    onMoveToOps(taskId) {
        const p = {
            'status': 'PENDING_ON_OPS',
            'currentOwner': ''
        }
        console.log('* on onMoveToOps: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendBackToDeveloper(taskId, currentOwnerSecurityGroup) {
        const task = this.taskData.find((task) => {
            return task.taskId === taskId;
        });
        console.log('* task: ', task);

        let p = {};
        if(currentOwnerSecurityGroup === 'OPS') {
            p = { 
                'status': 'NEW', 
                'currentOwner': task['devUser'], 
                'devUser' : '' 
            };
        }
        else if(currentOwnerSecurityGroup === 'INTERNAL_VALIDATOR') {
            p = { 
                'status': 'NEW', 
                'currentOwner': task['devUser'], 
                'invUser': '' 
            };
        }
        console.log('* on Send back to dev: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });

        /* this.taskService.getTask(taskId)
            .subscribe((resp: Response) => {
                const task = resp.json();
                this.taskService.updateTask(taskId, {
                    'status': this.taskService.fromstatusToSTATUS('new'),
                    'currentOwner': task['devUser'],
                    'opsUser': ''
                }).subscribe((r: Response) => {
                    this.getMyBinTasks();
                });
            }); */
        
    }

    onSendForValidation(taskId) {
        const p = {
            'status': 'PENDING_INTERNAL_VALIDATION',
            'currentOwner': ''
        };
        console.log('* on Send for validation: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendForExternalValidation(taskId) {
        const p = {
            'status': 'PENDING_EXTERNAL_VALIDATION',
            'currentOwner': ''
        };
        console.log('* on Send for external validation: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onSendBackToInternalValidation(taskId) {
        const task = this.taskData.find(task => {
            return task.taskId === taskId;
        });
        console.log('* task: ', task)
        const p = {
            'status': 'PENDING_INTERNAL_VALIDATION',
            'currentOwner': task['invUser'],
            'exvUser': ''
        };
        console.log('* on Send back to internal validation: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
        /* this.taskService.getTask(taskId)
            .subscribe((resp: Response) => {
                const task = resp.json();
                this.taskService.updateTask(taskId, {
                    'status': this.taskService.fromstatusToSTATUS('int'),
                    'currentOwner': task['invUser'],
                    'ext': ''
                }).subscribe((r: Response) => {
                    this.getMyBinTasks();
                });
            }); */
    }

    onValidatedSuccessfully(taskId) {
        const task = this.taskData.find(task => {
            return task.taskId === taskId;
        });
        console.log('* task: ', task);
        const p = {
            'status': 'BUSINESS_VALIDATION_DONE',
            'currentOwner': task['devUser']
        };
        console.log('* on validated successfully: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
        /* this.taskService.getTask(taskId)
            .subscribe((resp: Response) => {
                const task = resp.json();
                this.taskService.updateTask(taskId, {
                    'status': this.taskService.fromstatusToSTATUS('bvd'),
                    'currentOwner': task['devUser']
                }).subscribe((r: Response) => {
                    this.getMyBinTasks();
                });
            }); */
        
    }

    onComplete(taskId) {
        const p = {
            'status': 'LIVE_IN_PRODUCTION',
            'currentOwner': ''
        };
        console.log('* on Complete: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onNoData(taskId) {
        const p = {
            'status': 'NO_DATA',
            'currentOwner': ''
        };
        console.log('* on No Data: ', p);
        this.taskService.updateTask(taskId, p).subscribe((r: Response) => {
            this.getMyBinTasks();
        });
    }

    onExpand(taskId) {
        this.router.navigate(['/tasks/taskDetails', taskId]);
        /* this.taskService.getTaskDetails(taskId)
            .subscribe((resp: Response) => {
                const { taskData }  = resp.json();
                let dialogRef = this.dialog.open(ModalComponent, {
                    width: '1000px',
                    data: { taskData }
                });
        
                dialogRef.afterClosed().subscribe((result) => {
                    console.log('The dialog was closed');
                });
            }); */
    }

    onNotes(taskId) {
        this.router.navigate(['/tasks/notes', taskId]);
    }

    /* onToggleDetails(taskId) {
        let s = this.taskData.find(task => {
        return task.id === taskId;
        });
        s.showDetails = !s.showDetails;
        this.taskDetails = this.taskService.getTaskDetails(taskId);
    } */

}
