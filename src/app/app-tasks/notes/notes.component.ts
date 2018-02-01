import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Response } from "@angular/http";
import { NgForm } from '@angular/forms';

import { TaskService } from '../../services/task.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
    
    taskId;
    username;
    subscriber;
    taskNotesData =[];
    showProgress = false;

    constructor(private route: ActivatedRoute, private taskService: TaskService, private authenticationService: AuthenticationService, private location: Location) { }

    ngOnInit() {
        const currentUser =  this.authenticationService.getCurrentUser();
        this.username = currentUser ? currentUser.username : '';

        this.subscriber = this.route.params.subscribe((params) => {
            this.taskId = +params['taskId'];
            this.getNotes();            
        });
    }

    onBack() {
        this.location.back();
    }

    onAddNote(form: NgForm) {
        const { newNote } = form.value;

        this.taskService.addTaskNote(this.taskId, newNote, this.username, Date.now())
            .subscribe((resp: Response) => {    
                this.getNotes();
            }, (err) => {
            
            });
    }

    getNotes() {
        this.showProgress = true;
        this.taskService.getTaskNotes(this.taskId)
            .subscribe((resp: Response) => {
                this.showProgress = false;
                this.taskNotesData  = resp.json();
                console.log('* taskNotesData: ' + this.taskNotesData);
            }, (err) => {
                this.showProgress = false;
                /* this.taskNotesData  = [
                    {
                        'taskId' : 1,
                        'note' : 'this is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a notethis is a note',
                        'username' : 'vs104t',
                        'datetime' : (new Date()).toLocaleDateString()
                    },
                    {
                        'taskId' : 1,
                        'note' : 'this is a note',
                        'username' : 'vs104t',
                        'datetime' : (new Date()).toLocaleDateString()
                    }
                ] */
            });
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
    }

}
