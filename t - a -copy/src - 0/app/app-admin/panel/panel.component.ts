import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  userData:any[];

  constructor(private userService: UserService) { }

    ngOnInit() {
        this.getUsers();
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

    onClick(userId, securityGroup) {
        const index = this.userData.findIndex(user => user.userId === userId);
        this.userData[index].securityGroup = securityGroup;
    }

    onSave() {
        const userData = this.userData.map((user) => {
            user.securityGroup = this.userService.fromsgToSG(user.securityGroup);
            return user;
        });
        this.userService.updateUsers(userData)
            .subscribe((r: Response) => {
                this.getUsers();
            });
    }

}
