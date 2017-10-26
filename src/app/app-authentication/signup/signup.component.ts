import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Response } from "@angular/http";

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signedUp;

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {
    const { firstname, lastname, email, username, password } = form.value;
    const loggedIn = this.authenticationService.signup(firstname, lastname, email, username, password)
    .subscribe((resp: Response) => {
      this.signedUp = resp.json();
      console.log(this.signedUp);
      if(this.signedUp) this.router.navigate(['/signin']);
    });
  }

  onSignIn() {
        this.router.navigate(['/signin']);
  }

}
