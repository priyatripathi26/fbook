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
  @Output() newPost = new EventEmitter<any>();

  constructor(
    private userService: User,
    private postService: Post
  ) { }

  ngOnChanges() {
    if(this.post && this.post.id) {
      this.isEdit = true;
    } else {
      this.isEdit = false;
    }
  }

  createOrUpdate(form: NgForm) {
    if ((!form.value.text || form.value.text.trim().length < 1) && (!form.value.image || form.value.image.trim().length < 1)) {
      this.error = 'Post cannot be empty';
      return;
    }
    if (!this.isEdit) {
      this.createPost(form);
    } else {
      this.updatePost(form);
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

  updatePost(form: NgForm) {
    let userId = this.userService.getCurrentUserId();
    if(!userId || userId !== this.post.userId) {
      this.error = 'User not logged in or invalid';
      return;
    }


    if (!this.post || !this.post.id) {
      this.error = 'Invalid post';
      return;
    }
    let updatedPost = {
      text: form.value.text,
      image: form.value.image
    };
    this.postService.updatePost(this.post.id, updatedPost).subscribe(post => {
      this.success = 'Post updated successfully';
      this.error = '';
      this.newPost.emit(post);
      setTimeout(() => {
        this.closeCard(true);
      }, 1000);
    }, error => {
      this.error = 'Error updating post';
      this.success = '';
      console.error('Error updating post:', error);
    });
  }

  onInput() { }

  closeCard(staus: boolean = false) {
    this.close.emit(staus);
  }
}
