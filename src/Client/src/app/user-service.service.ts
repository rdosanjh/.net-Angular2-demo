import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router'
import { IUser } from './Models/User'

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Subject } from 'rxjs/Subject';

import { ApiService } from './api.service'


@Injectable()
export class UserService {
    private _userSubject = new Subject<IUser>();
    user$ = this._userSubject.asObservable();
    _user?: IUser;
    constructor(private api: ApiService,  private router : Router) {
        this.user$.subscribe(result => {
            this._user = result;
        })
    }

    GetLoggedInUser(): Observable<IUser> {
        let user = localStorage.getItem("user");
        let userObj = <IUser>JSON.parse(user);
        if (user) {
            setTimeout(() => {
                this._userSubject.next(userObj);
            }, 0);
            this.api.setHeader('Authorization', userObj.id);
        }

        return this.user$.share();
    }

    RegisterUser(user: IUser): Observable<IUser> {
        let body = JSON.stringify(user);
        let result = this.api.post('/api/User', body)
            .map(this.extractData);

        result.subscribe(user => {
            localStorage.setItem("user", JSON.stringify(user));
            this._userSubject.next(user);
            this.api.setHeader('Authorization', user.id);
        })
        return result;
    }

    AuthenticateUser(username: string, password: string): Observable<any> {
        let result = this.api.get('/api/User', {
            Username: username,
            Password: password
        })
            .map(this.extractData);

        result.subscribe(user => {
            localStorage.setItem("user", JSON.stringify(user));
            this._userSubject.next(user);
            this.api.setHeader('Authorization', user.id);
        })

        return result;

    }

    RedirectIfNotLoggedIn(){
        if(this._user){
            return;
        }
        this.router.navigateByUrl('/register');
        return;
    }

    logOut():void {
        this._userSubject.next(null);
        this.api.removeHeader('Authorization');
        localStorage.clear();
        this.router.navigateByUrl("register");
    }

    private extractData(res: Response): IUser {
        let body = res.json();
        return <IUser>body;
    }

}
