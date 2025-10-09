import { Component, Input } from '@angular/core';
import { UserCard } from "../../compoments/user-card/user-card";
import { User } from '../../services/user';

@Component({
  selector: 'app-users-archive',
  imports: [UserCard],
  templateUrl: './users-archive.html',
  styleUrl: './users-archive.css'
})
export class UsersArchive {
  @Input() isRecivedRequest: boolean = false;
  @Input() isSentRequest: boolean = false;
  @Input() isFriend: boolean = false;
  @Input() isAllUsers: boolean = false;

  currentUserId: any = null;
  currentUser: any = {};
  allUsers: any[] = [];

  constructor(
    private userService: User
  ) { }

  ngOnChanges(): void {
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (data && data.id) {
        this.currentUser = data;
        this.currentUserId = data.id;
        this.getUsers();
      } else {
        this.currentUser = {};
      }
    }, error => {
      this.currentUser = {};
      console.error('Error fetching current user:', error);
    });
  }

  getUsers() {

    if (!this.currentUserId) {

      this.allUsers = [];
      return;
    }
    this.userService.getAllUsers().subscribe(users => {
      this.allUsers = users.filter((user: any) => user.id !== this.currentUserId) || [];
      if(this.isFriend){
        this.allUsers = this.allUsers.filter((user: any) => this.currentUser.friends?.includes(user.id)) || [];
      }
      if(this.isRecivedRequest){
        this.allUsers = this.allUsers.filter((user: any) => this.currentUser.received_friend_requests?.includes(user.id)) || [];
      }
      if(this.isSentRequest){
        this.allUsers = this.allUsers.filter((user: any) => this.currentUser.sent_friend_requests?.includes(user.id)) || [];
      }
    }, error => {
      this.allUsers = [];
      console.error('Error fetching users:', error);
    });

  }
}

