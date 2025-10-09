import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { timestamp } from 'rxjs';
import { User } from '../../services/user';
import { Post } from '../../services/post';

@Component({
  selector: 'app-edit-post',
  imports: [FormsModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css'
})
export class EditPost {
  isEdit: boolean = false;
  error: string = '';
  success: string = '';
  @Input() post: any = {
    "id": '',
    "text": '',
    "image": '',
    "userId": '',
    "timestamp": 0,
    "likesUserIds": [],
    "hidden": false,
    "blocked": false
  };
  @Output() close = new EventEmitter<boolean>();

  constructor(
    private userService: User,
    private postService: Post
  ) { }

  createOrUpdate(form: NgForm) {
    if ((!form.value.text || form.value.text.trim().length < 1) && (!form.value.image || form.value.image.trim().length < 1)) {
      this.error = 'Post cannot be empty';
      return;
    }
    if (!this.isEdit) {
      this.createPost(form);
    }
  }

  createPost(form: NgForm) {
    let userId = this.userService.getCurrentUserId();
    if (!userId) {
      this.error = 'User not logged in';
      return;
    }
    let newPost = {
      text: form.value.text,
      image: form.value.image,
      "timestamp": timestamp,
      userId: userId
    };

    this.postService.createPost(newPost).subscribe(post => {
      this.success = 'Post created successfully';
      this.error = '';
      form.resetForm();
      setTimeout(() => {
        this.closeCard(true);
      }, 1000);
    }, error => {
      this.error = 'Error creating post';
      this.success = '';
      console.error('Error creating post:', error);
    });

  }

  onInput() { }

  closeCard(staus: boolean = false) {
    this.close.emit(staus);
  }
}
