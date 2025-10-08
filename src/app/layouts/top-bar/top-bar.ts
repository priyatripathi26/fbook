import { Component } from '@angular/core';
import { User } from '../../services/user';
import { UserProfileIcon } from "../../components/user-profile-icon/user-profile-icon";
import { NgIf } from '@angular/common';
import { Auth } from '../../services/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  imports: [UserProfileIcon, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css'
})
export class TopBar {
  isAdmin = false;
  user: any;

  constructor(
    private userService: User,
    private authService: Auth
  ) {

  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser()?.subscribe((data:any) => {
      if (data && data.id) {
        this.user = data;
        this.isAdmin = this.user.role === 'admin';
      }
    });
  }

  logout() {
    this.authService.logout();
  }

}
