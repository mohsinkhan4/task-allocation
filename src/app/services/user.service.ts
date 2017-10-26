import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";

import { EnvService } from "./env.service";

@Injectable()
export class UserService {

    constructor(private http: Http, private envService: EnvService) {}

    getUsers() {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        return this.http.get('http://' + HOST + ':' + PORT + '/rest/users'); 
    }

    updateUsers(userData) {
        const { HOST, PORT } = this.envService.getConnectionDetails();
        return this.http.put('http://' + HOST + ':' + PORT + '/rest/users', { userData });
    }
    
    // ********************************************************************************************************************************************

    createUser(userData) {
        const ud = this.userData.sort((a, b) => (a.id < b.id ? -1 : 1));
        let maxId = ud && ud.length > 0 ? ud[0].id : 0;
        this.userData.push({
            'userId': maxId++,
            'username': userData.username,
            'password': userData.password,
            'firstname': userData.firstname,
            'lastname': userData.lastname,
            'email': userData.email,
            'securityGroup': 'dev'
        });
        console.log(this.userData);
    }

    getUser(username) {
        return this.userData.find(user => user.username === username);
    }

    updateUser(id, userData) {
        const index = this.userData.findIndex(user => user.id === id)
        this.userData[index] = userData;
    }

    
    private userData: any[] = [{
        'userId': '0',
        'username': 'q',
        'password': 'q',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'dev'
    }, {
        'userId': '1',
        'username': 'w',
        'password': 'w',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'ops'
    },{
        'userId': '2',
        'username': 'e',
        'password': 'e',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'int'
    }, {
        'userId': '3',
        'username': 'r',
        'password': 'r',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'ext'
    }, {
        'userId': '4',
        'username': 't',
        'password': 't',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'led'
    }, {
        'userId': '5',
        'username': 'y',
        'password': 'y',
        'firstname': '',
        'lastname': '',
        'email': '',
        'securityGroup': 'mgr'
    }];


}
