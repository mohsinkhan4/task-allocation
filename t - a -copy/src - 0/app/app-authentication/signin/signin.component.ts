import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Response } from "@angular/http";

import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signedIn;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() { }

    onSignin(form: NgForm) {
        const { username, password } = form.value;
        const loggedIn = this.authenticationService.signin(username, password)
            .subscribe((resp: Response) => {
                const { signedIn, userData } = resp.json();
                this.authenticationService.setCurrentUser(userData);
                if(signedIn) this.router.navigate(['/tasks/available']);
            });
    }

    onRegister() {
        this.router.navigate(['/signup']);
    }
}
