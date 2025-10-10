import { Component, Input } from '@angular/core';
import { UserCard } from "../../compoments/user-card/user-card";
import { User } from '../../services/user';
import { ProfileSidebar } from "../../components/profile-sidebar/profile-sidebar";

@Component({
  selector: 'app-profile-block',
  imports: [UserCard, ProfileSidebar],
  templateUrl: './profile-block.html',
  styleUrl: './profile-block.css'
})
export class ProfileBlock {
  @Input() userId: any = '';

  currentUserId: any = null;
  currentUser: any = {};
  profileUser: any = {};

  constructor(
    private userService: User
  ) { }

  ngOnChanges(): void {
    this.currentUser = this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (data && data.id) {
        this.currentUser = data;
        this.currentUserId = data.id;
        this.getProfileUser();
      } else {
        this.currentUser = {};
      }
    }, error => {
      this.currentUser = {};
      console.error('Error fetching current user:', error);
    });
  }

  getProfileUser() {
    if (!this.userId) {
      this.profileUser = {};
      return;
    }
    this.userService.getUserById(this.userId).subscribe(user => {
      this.profileUser = user || {};
    }
      , error => {
        this.profileUser = {};
        console.error('Error fetching profile user:', error);
      });
  }
}

