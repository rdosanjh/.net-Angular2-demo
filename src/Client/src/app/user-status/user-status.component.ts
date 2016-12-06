import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service'

import { IUser } from '../Models/User'
@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  private user: IUser;
  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.GetLoggedInUser().subscribe(user => {
      this.user = user;
    })
  }

  logout(){
    this._userService.logOut();
  }

}
