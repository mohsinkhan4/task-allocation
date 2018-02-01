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
  showProgress = false;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() { }

    onSignin(form: NgForm) {
        const { username, password } = form.value;
        const loggedIn = this.authenticationService.signin(username, password)
            .subscribe((resp: Response) => {
                this.showProgress = false;
                const { result, user } = resp.json();
                this.authenticationService.setCurrentUser(user);
                if(result) this.router.navigate(['/tasks/available']);
            });
        this.showProgress = true;
    }

    onRegister() {
        this.router.navigate(['/signup']);
    }

    onAdmin() {
        this.router.navigate(['/admin']);
    }
}
