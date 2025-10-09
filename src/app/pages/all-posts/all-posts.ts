import { Component } from '@angular/core';
import { TopBar } from '../../layouts/top-bar/top-bar';
import { PostArchive } from '../../layouts/post-archive/post-archive';

@Component({
  selector: 'app-all-posts',
  imports: [TopBar, PostArchive],
  templateUrl: './all-posts.html',
  styleUrl: './all-posts.css'
})
export class AllPosts {

}
