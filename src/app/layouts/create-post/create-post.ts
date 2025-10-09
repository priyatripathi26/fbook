import { Component, EventEmitter, Output } from '@angular/core';
import { EditPost } from "../../components/edit-post/edit-post";

@Component({
  selector: 'app-create-post',
  imports: [EditPost],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css'
})
export class CreatePost {
  opened: boolean = false;
  @Output() newPost = new EventEmitter<boolean>();

  constructor() { }

  toggle(status: boolean = false) {
    this.opened = !this.opened;

    if (status) {
      this.newPost.emit(true);
    }
  }

}
