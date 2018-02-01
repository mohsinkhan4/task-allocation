import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { UserService } from "./user.service";
import { EnvService } from "./env.service";

@Injectable()
export class AuthenticationService {

    private userData: any;
    
    constructor(private http: Http, private userService: UserService, private envService: EnvService) {}
    
    signup(firstname, lastname, email, username, password) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        return this.http.post('http://' + HOST + ':' + PORT + '/rest/users/signup', {
            firstname,
            lastname,
            email,
            username,
            password
        });
    }
    
    signin(username, password) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        return this.http.post('http://' + HOST + ':' + PORT + '/rest/users/signin', {
            username,
            password
        });
    }
    
    setCurrentUser(userData) {
        this.userData = userData;
    }
    
    getCurrentUser() {
        return this.userData;
    }
    
    // ********************************************************************************************************************************************
    
    isAuthenticated: boolean = false;
    signup_(firstname, lastname, email, username, password) {
        this.userService.createUser({
            firstname,
            lastname,
            email,
            username,
            password
        });
    }

    signin_(u, p) {
        const userData = this.userService.getUser(u);
        const { username, password } = userData;
        this.isAuthenticated = (username === u && password === p);
        if(this.isAuthenticated) this.userData = userData;
        return this.isAuthenticated;
    }
}