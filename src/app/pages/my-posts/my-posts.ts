import { Component } from '@angular/core';
import { PostArchive } from '../../layouts/post-archive/post-archive';
import { TopBar } from '../../layouts/top-bar/top-bar';

@Component({
  selector: 'app-my-posts',
  imports: [PostArchive, TopBar],
  templateUrl: './my-posts.html',
  styleUrl: './my-posts.css'
})
export class MyPosts {

}
