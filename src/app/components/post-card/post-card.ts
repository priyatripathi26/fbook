import { Component, Input } from '@angular/core';
import { User } from '../../services/user';
import { UserProfileIcon } from '../user-profile-icon/user-profile-icon';
import { DatePipe, NgClass } from '@angular/common';
import { Post } from '../../services/post';
import { EditPost } from '../edit-post/edit-post';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';
import { TooltipDirective } from '../../shared/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [UserProfileIcon, DatePipe, EditPost, ConfirmationModal, NgClass, TooltipDirective, RouterLink],
  templateUrl: './post-card.html',
  styleUrl: './post-card.css'
})
export class PostCard {
  @Input() post: any;
  initialPost: any;
  author: any = {};
  isEditing: boolean = false;
  currentUser: any = {};
  hidingPost: boolean = false;
  unhidingPost: boolean = false;
  deletingPost: boolean = false;
  blockingPost: boolean = false;
  unblockingPost: boolean = false;
  confirmationMassege: string = '';
  danger: boolean = false;
  constructor(
    private userService: User,
    private postService: Post
  ) { }

  ngOnChanges() {
    if (this.post && this.post.userId) {
      this.initialPost = { ...this.post };
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
    this.userService.getCurrentUser()?.subscribe((data: any) => {
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

  editCancel(event: boolean) {
    this.isEditing = false;

    if (!event) {
      this.post = { ...this.initialPost };
    }
  }

  newPost(event: any) {
    this.post = event;
    this.isEditing = false;
  }

  hidePost() {
    this.resetConfirmation();
    if (!this.post || !this.post.id || !this.currentUser || !this.currentUser.id || this.currentUser.id != this.post.userId) return;
    this.confirmationMassege = 'Are you sure you want to hide this post?';
    this.danger = true
    this.hidingPost = true;
  }

  unhidePost() {
    this.resetConfirmation();
    if (!this.post || !this.post.id || !this.currentUser || !this.currentUser.id || this.currentUser.id != this.post.userId) return;
    this.confirmationMassege = 'Are you sure you want to show this post?';
    this.danger = false
    this.unhidingPost = true;
  }

  blockPost() {
    this.resetConfirmation();
    if (!this.post || !this.post.id || !this.currentUser || !this.currentUser.id || this.currentUser.role != 'admin') return;
    this.confirmationMassege = 'Are you sure you want to block this post?';
    this.danger = true
    this.blockingPost = true;
  }
  unblockPost() {
    this.resetConfirmation();
    if (!this.post || !this.post.id || !this.currentUser || !this.currentUser.id || this.currentUser.role != 'admin') return;
    this.confirmationMassege = 'Are you sure you want to unblock this post?';
    this.danger = false
    this.unblockingPost = true;
  }
  
  deletePost() {
    this.resetConfirmation();
    if (!this.post || !this.post.id || !this.currentUser || !this.currentUser.id || (this.currentUser.id != this.post.userId && this.currentUser.role != 'admin' )) return;
    this.confirmationMassege = 'Are you sure you want to delete this post?';
    this.danger = true
    this.deletingPost = true;
  }

  confirmRes(event: boolean) {
    console.log('Confirmation result:', event);
    this.danger = false;
    this.confirmationMassege = '';
    if (event) {
      if (this.hidingPost) {
        this.resetConfirmation();
        this.hidePostApi();
      }
      if (this.unhidingPost) {
        this.resetConfirmation();
        this.unhidePostApi();
      }
      if (this.deletingPost) {
        this.resetConfirmation();
        this.deletePostApi();
      }
      if (this.blockingPost) {
        this.resetConfirmation();
        this.blockPostApi();
      }
      if (this.unblockingPost) {
        this.resetConfirmation();
        this.unblockPostApi();
      }
    }

    this.resetConfirmation();
  }

  hidePostApi() {
    let postData = { hidden: true };
    this.postService.updatePost(this.post.id, postData).subscribe({
      next: (updatedPost) => {
        this.post = updatedPost;
      },
      error: (error) => {
        console.error('Error hiding post:', error);
      }
    });
  }

   blockPostApi() {
    let postData = { blocked: true };
    this.postService.updatePost(this.post.id, postData).subscribe({
      next: (updatedPost) => {
        this.post = updatedPost;
      },
      error: (error) => {
        console.error('Error blocking post:', error);
      }
    });
  }

   unblockPostApi() {
    let postData = { blocked: false };
    this.postService.updatePost(this.post.id, postData).subscribe({
      next: (updatedPost) => {
        this.post = updatedPost;
      },
      error: (error) => {
        console.error('Error blocking post:', error);
      }
    });
  }

   unhidePostApi() {
    let postData = { hidden: false };
    this.postService.updatePost(this.post.id, postData).subscribe({
      next: (updatedPost) => {
        this.post = updatedPost;
      },
      error: (error) => {
        console.error('Error unhiding post:', error);
      }
    });
  }
  deletePostApi() {
    this.postService.deletePost(this.post.id).subscribe({
      next: (res) => {
        this.post = null;
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  resetConfirmation() {
    this.hidingPost = false;
    this.unhidingPost = false;
    this.deletingPost = false;
    this.blockingPost = false;
    this.unblockingPost = false;
    this.confirmationMassege = '';
    this.danger = false;
  }

}
