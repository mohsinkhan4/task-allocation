import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from "@angular/http";

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit, OnDestroy  {

    taskId;
    subscriber;
    taskDetailsData;
    noData;

    constructor(private route: ActivatedRoute, private taskService: TaskService) { }

    ngOnInit() {
        this.subscriber = this.route.params.subscribe((params) => {
            this.taskId = +params['taskId'];
    
            this.noData = true;
            this.taskService.getTaskDetails(this.taskId)
            .subscribe((resp: Response) => {
                this.taskDetailsData  = resp.json();
                console.log('* taskDetailsData: ' + this.taskDetailsData);
                if(this.taskDetailsData.length > 0) { this.noData = false; }
            });
        });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }

}
