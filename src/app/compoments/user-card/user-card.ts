import { Component, Input } from '@angular/core';
import { User } from '../../services/user';
import { UserProfileIcon } from "../../components/user-profile-icon/user-profile-icon";
import { ConfirmationModal } from "../../components/confirmation-modal/confirmation-modal";
import { TooltipDirective } from '../../shared/tooltip';

@Component({
  selector: 'app-user-card',
  imports: [UserProfileIcon, ConfirmationModal, TooltipDirective],
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

  unblockUser() {
    this.resetConfirmation();
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id || this.currentUser.role != 'admin') return;
    this.confirmationMassege = 'Are you sure you want to unblock this user?';
    this.danger = false;
    this.unblockingUser = true;
  }

  blockUser() {
    this.resetConfirmation();
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id || this.currentUser.role != 'admin') return;
    this.confirmationMassege = 'Are you sure you want to block this user?';
    this.danger = true
    this.blockingUser = true;
  }

  unfriend(){
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id) return;
    let updatedCurrentUserFriends = this.currentUser.friends?.filter((id: any) => id !== this.user.id) || [];
    let updatedUserFriends = this.user.friends?.filter((id: any) => id !== this.currentUser.id) || [];

    this.userService.updateUser(this.currentUser.id, { friends: updatedCurrentUserFriends }).subscribe({
      next: (updatedCurrentUser) => {
        this.currentUser = updatedCurrentUser; 
        this.userService.updateUser(this.user.id, { friends: updatedUserFriends }).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser; 
          },
          error: (error) => {
            console.error('Error updating user friends:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating current user friends:', error);
      }
    });
  }

  cancelRequest(){
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id) return;
    let updatedCurrentUserSentRequests = this.currentUser.sent_friend_requests?.filter((id: any) => id !== this.user.id) || [];
    let updatedUserReceivedRequests = this.user.received_friend_requests?.filter((id: any) => id !== this.currentUser.id) || [];
    this.userService.updateUser(this.currentUser.id, { sent_friend_requests: updatedCurrentUserSentRequests }).subscribe({
      next: (updatedCurrentUser) => {
        this.currentUser = updatedCurrentUser;
        this.userService.updateUser(this.user.id, { received_friend_requests: updatedUserReceivedRequests }).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser;
          },
          error: (error) => {
            console.error('Error updating user received requests:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating current user sent requests:', error);
      }
    });
  }

  acceptRequest(){
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id) return;
    let updatedCurrentUserFriends = this.currentUser.friends || [];
    let updatedUserFriends = this.user.friends || [];
    let updatedCurrentUserReceivedRequests = this.currentUser.received_friend_requests?.filter((id: any) => id !== this.user.id) || [];
    let updatedUserSentRequests = this.user.sent_friend_requests?.filter((id: any) => id !== this.currentUser.id) || [];
    if(!updatedCurrentUserFriends.includes(this.user.id)){
      updatedCurrentUserFriends.push(this.user.id);
    }
    if(!updatedUserFriends.includes(this.currentUser.id)){
      updatedUserFriends.push(this.currentUser.id);
    }
    this.userService.updateUser(this.currentUser.id, { friends: updatedCurrentUserFriends, received_friend_requests: updatedCurrentUserReceivedRequests }).subscribe({
      next: (updatedCurrentUser) => {
        this.currentUser = updatedCurrentUser;
        this.userService.updateUser(this.user.id, { friends: updatedUserFriends, sent_friend_requests: updatedUserSentRequests }).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser;
          },
          error: (error) => {
            console.error('Error updating user friends:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating current user friends:', error);
      }
    });
  }

  declineRequest(){
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id) return;
    let updatedCurrentUserReceivedRequests = this.currentUser.received_friend_requests?.filter((id: any) => id !== this.user.id) || [];
    let updatedUserSentRequests = this.user.sent_friend_requests?.filter((id: any) => id !== this.currentUser.id) || [];
    this.userService.updateUser(this.currentUser.id, { received_friend_requests: updatedCurrentUserReceivedRequests }).subscribe({
      next: (updatedCurrentUser) => {
        this.currentUser = updatedCurrentUser;
        this.userService.updateUser(this.user.id, { sent_friend_requests: updatedUserSentRequests }).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser;
          },
          error: (error) => {
            console.error('Error updating user sent requests:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating current user received requests:', error);
      }
    });
  }
  
  sendRequest(){
    if (!this.user || !this.user.id || !this.currentUser || !this.currentUser.id) return;
    let updatedCurrentUserSentRequests = this.currentUser.sent_friend_requests || [];
    let updatedUserReceivedRequests = this.user.received_friend_requests || [];

    if(!updatedCurrentUserSentRequests.includes(this.user.id)){
      updatedCurrentUserSentRequests.push(this.user.id);
    }
    if(!updatedUserReceivedRequests.includes(this.currentUser.id)){
      updatedUserReceivedRequests.push(this.currentUser.id);
    }
    this.userService.updateUser(this.currentUser.id, { sent_friend_requests: updatedCurrentUserSentRequests }).subscribe({
      next: (updatedCurrentUser) => {
        this.currentUser = updatedCurrentUser;
        this.userService.updateUser(this.user.id, { received_friend_requests: updatedUserReceivedRequests }).subscribe({
          next: (updatedUser) => {
            this.user = updatedUser;
          },
          error: (error) => {
            console.error('Error updating user received requests:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error updating current user sent requests:', error);
      }
    });
  }

  confirmRes(event: boolean) {
    console.log('Confirmation result:', event);
    this.danger = false;
    this.confirmationMassege = '';
    if (event) {
      if (this.blockingUser) {
        this.resetConfirmation();
        this.blockUserApi();
      }
      if (this.unblockingUser) {
        this.resetConfirmation();
        this.unblockUserApi();
      }
    }

    this.resetConfirmation();
  }

  blockUserApi() {
    let userData = { blocked: true };
    this.userService.updateUser(this.user.id, userData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
      },
      error: (error) => {
        console.error('Error blocking user:', error);
      }
    });
  }

  unblockUserApi() {
    let postData = { blocked: false };
    this.userService.updateUser(this.user.id, postData).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
      },
      error: (error) => {
        console.error('Error blocking user:', error);
      }
    });
  }

  resetConfirmation() {
    this.confirmationMassege = '';
    this.danger = false;
    this.blockingUser = false;
    this.unblockingUser = false;
  }

}
