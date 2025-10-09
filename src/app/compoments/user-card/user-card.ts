import { Component, Input } from '@angular/core';
import { User } from '../../services/user';
import { UserProfileIcon } from "../../components/user-profile-icon/user-profile-icon";
import { ConfirmationModal } from "../../components/confirmation-modal/confirmation-modal";

@Component({
  selector: 'app-user-card',
  imports: [UserProfileIcon, ConfirmationModal],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css'
})
export class UserCard {
  @Input() user: any;
  currentUser: any = {};
  blockingUser: boolean = false;
  unblockingUser: boolean = false
  confirmationMassege: string = '';
  danger: boolean = false;

  constructor(
    private userService: User
  ) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (data && data.id) {
        this.currentUser = data;
      } else {
        this.currentUser = {};
      }
    }, error => {
      this.currentUser = {};
      console.error('Error fetching current user:', error);
    });
  }

  unblockUser() { }
  blockUser() { }
  confirmRes(status: boolean) { }

}
