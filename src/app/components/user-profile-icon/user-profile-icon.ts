import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-icon',
  imports: [NgClass, CommonModule],
  templateUrl: './user-profile-icon.html',
  styleUrl: './user-profile-icon.css'
})
export class UserProfileIcon {
  @Input() user: any;
  @Input() smallSize: boolean = true;

  ifUserImage = false;
  userInitials = '';

  ngOnChanges() {
    this.user = this.user || {};
    this.createProfileIcon();
  }

  createProfileIcon() {
    if (this.user && this.user.profile_picture) {
      this.ifUserImage = true;
    } else {
      this.ifUserImage = false;
      if (this.user && this.user.first_name && this.user.last_name) {
        this.userInitials = this.user.first_name.charAt(0).toUpperCase() + this.user.last_name.charAt(0).toUpperCase();
      } else if (this.user && this.user.first_name) {
        this.userInitials = this.user.first_name.charAt(0).toUpperCase();
      } else {
        this.userInitials = '';
      }
    }
  }

}
