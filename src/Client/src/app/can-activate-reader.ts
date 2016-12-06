import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxJS/Observable';
import { UserService } from './user-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CanActivateReader implements CanActivate {
    constructor(private UserService: UserService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.UserService.GetLoggedInUser()
            .map(() => {
                return true;
            });
    }
}
