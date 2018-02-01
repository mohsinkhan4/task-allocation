import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }

    ngOnInit() {
    }

    onLogout() {
        this.authenticationService.setCurrentUser(null);
        this.router.navigate(['/signin']);
    }

}
