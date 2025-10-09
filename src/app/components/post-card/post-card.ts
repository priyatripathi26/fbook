import { Component, Input } from '@angular/core';
import { User } from '../../services/user';
import { UserProfileIcon } from '../user-profile-icon/user-profile-icon';
import { DatePipe } from '@angular/common';
import { Post } from '../../services/post';

@Component({
  selector: 'app-post-card',
  imports: [UserProfileIcon, DatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
  @Input() post: any;
  author: any = {};
  isEditing: boolean = false;
  currentUser: any = {};

  constructor(
    private userService: User,
    private postService: Post
  ) { }

  ngOnChanges() {
    if( this.post && this.post.userId ) {
      this.getAuthor();
      this.getCurrentUser();
    }
  }

  getAuthor() {
    this.userService.getUserById(this.post.userId).subscribe(user => {
      this.author = user || {};
    }, error => {
      this.author = {};
      console.error('Error fetching user:', error);
    });
  }

  getCurrentUser() {
    this.userService.getCurrentUser()?.subscribe((data:any) => {
      if (data && data.id) {
        this.currentUser = data;
      } else {
        this.currentUser = {};
      }
    });
  }

  toggleLike() {
    if (!this.post) return;
    const currentUserId = this.currentUser.id;
    if (!currentUserId) return;
    if (!this.post.likesUserIds) {
      this.post.likesUserIds = [];
    }
    const index = this.post.likesUserIds.indexOf(currentUserId);
    if (index === -1) {
      this.post.likesUserIds.push(currentUserId);
    } else {
      this.post.likesUserIds.splice(index, 1);
    }

    this.postService.updatePost(this.post.id, { likesUserIds: this.post.likesUserIds }).subscribe({ 
      next: (updatedPost) => {
        this.post = updatedPost;
      },
      error: (error) => {
        console.error('Error updating likes:', error);
      }
    });

  }
}
