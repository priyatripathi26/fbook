import { Component } from '@angular/core';
import { User } from '../../services/user';
import { Post } from '../../services/post';
import { UserProfileIcon } from "../user-profile-icon/user-profile-icon";
import { RouterLink } from '@angular/router';
import { TooltipDirective } from '../../shared/tooltip';

@Component({
  selector: 'app-profile-sidebar',
  imports: [UserProfileIcon, RouterLink, TooltipDirective],
  templateUrl: './profile-sidebar.html',
  styleUrl: './profile-sidebar.css'
})
export class ProfileSidebar {
  user: any = {};
  posts: any[] = [];
  constructor(
    private userService: User,
    private postService: Post
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (data && data.id) {
        this.user = data;

        this.postService.getPosts(this.user.id).subscribe(posts => {
          this.posts = posts || [];
        }, error => {
          this.posts = [];
          console.error('Error fetching posts:', error);
        });

      } else {
        console.error('Error fetching current user');
      }
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }
}
