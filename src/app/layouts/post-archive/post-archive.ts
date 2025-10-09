import { Component, Input } from '@angular/core';
import { Post } from '../../services/post';
import { User } from '../../services/user';
import { PostCard } from '../../components/post-card/post-card';
import { CreatePost } from "../create-post/create-post";

@Component({
  selector: 'app-post-archive',
  imports: [PostCard, CreatePost],
  templateUrl: './post-archive.html',
  styleUrl: './post-archive.css'
})
export class PostArchive {
  @Input() isSelf: boolean = false;
  @Input() canCreatePost: boolean = true;
  currentUserId: any = null;
  posts: any[] = [];

  constructor(
    private postService: Post,
    private userService: User
  ) { }

  ngOnInit() {
    this.currentUserId = this.userService.getCurrentUserId();
    this.getPosts();
  }

  ngOnChanges() {
    this.getPosts();
  }

  getPosts() {
    if (! this.currentUserId) {
      this.posts = [];
      return;
    }
    let userId = '';
    if (this.isSelf) {
      userId = this.currentUserId;
    }
    this.postService.getPosts(userId).subscribe(posts => {
      posts.sort((a, b) => b.timestamp - a.timestamp);
      this.posts = posts || [];
    }, error => {
      this.posts = [];
      console.error('Error fetching posts:', error);
    }
    );
  }

  newPostAdded(status: boolean) {
    if (status) {
      this.getPosts();
    } 
  }
}
