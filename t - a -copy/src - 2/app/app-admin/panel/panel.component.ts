import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from "@angular/http";

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  userData:any[];

  constructor(private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.getUsers();
    }

    onSignIn() {
        this.router.navigate(['/signin']);
    }

    getUsers() {
        this.userService.getUsers()
            .subscribe((resp: Response) => {
                const { userData }  = resp.json();
                this.userData = userData.map((user) => {
                    user.securityGroup = this.userService.fromSGTosg(user.securityGroup);
                    return user;
                });
                console.log(this.userData);
            });
    }

    onClick(username, sg, addSecurityGroup) {
        const securityGroup = this.userService.fromsgToSG(sg);
        this.userService.updateUser(username, securityGroup, addSecurityGroup)
            .subscribe((resp: Response) => {
                console.log(resp);
            });
        // const index = this.userData.findIndex(user => user.username === username);
        // this.userData[index].securityGroup = securityGroup;
    }

    /* onSave() {
        const userData = this.userData.map((user) => {
            user.securityGroup = this.userService.fromsgToSG(user.securityGroup);
            return user;
        });
        this.userService.updateUsers(userData)
            .subscribe((r: Response) => {
                this.getUsers();
            });
    } */

}
