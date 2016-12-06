import { Component, OnInit } from '@angular/core';

import { UserService } from '../user-service.service'
import { IUser } from '../Models/User';

import { Router, CanActivate } from '@angular/router'
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    user: IUser;
    userCreds: any;

    constructor(private userService: UserService, private router: Router) {
        this.user = <IUser>{};
        this.user.role = 'reader';
        this.userCreds = {};

        this.userService.GetLoggedInUser().subscribe(success => {
            this.router.navigateByUrl('/');
        })
    }

    onRegister() {
        this.userService.RegisterUser(this.user)
            .map(success => {
                this.router.navigateByUrl('/');
            });
    }

    onLogin() {
        this.userService.AuthenticateUser(<string>this.userCreds.Username, <string>this.userCreds.Password);
    }

}
