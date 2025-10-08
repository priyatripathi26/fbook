import { Component } from '@angular/core';
import { TopBar } from "../../layouts/top-bar/top-bar";
import { User } from '../../services/user';
import { UserProfileIcon } from "../../components/user-profile-icon/user-profile-icon";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-setting',
  imports: [TopBar, UserProfileIcon, FormsModule],
  templateUrl: './setting.html',
  styleUrl: './setting.css'
})
export class Setting {
  user: any;

  editedUser: any = {};
  password = '';
  cpassword = '';
  errorMsg = '';
  successMsg = '';

  constructor(
    private userService: User
  ) {

  }

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (data && data.id) {
        this.user = data;
        this.editedUser = { ...data};
      }
    });
  }

  onSubmitProfile(form: NgForm) {
    this.errorMsg = '';
    this.successMsg = '';

    if (form.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }


    const newUserData = {
      first_name: this.editedUser.first_name.trim(),
      last_name: this.editedUser.last_name.trim(),
      profile_picture: this.editedUser.profile_picture.trim(),
    };

    this.userService.updateUser(this.user.id, newUserData).subscribe({
      next: () => {
        this.successMsg = 'Profile updated successfully!';
        setTimeout(() => {
          this.successMsg = '';
        }, 2000);
        this.getUserData();
      },
      error: () => this.errorMsg = 'Something Went Wrong. Try again.'
    });
  }

  onSubmitPassword(form: NgForm) {
    this.errorMsg = '';
    this.successMsg = '';


    if (this.password !== this.cpassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    if (form.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }
    if (this.password !== this.cpassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    const newUserData = {
      password: this.password.trim(),
    };

    this.userService.updateUser(this.user.id, newUserData).subscribe({
      next: () => {
        this.successMsg = 'Password updated successfully!';
        setTimeout(() => {
          this.successMsg = '';
        }, 2000);
        this.getUserData();
      },
      error: () => this.errorMsg = 'Something Went Wrong. Try again.'
    });

  }

  onInput() {
    this.errorMsg = '';
    this.successMsg = '';
  }

}
