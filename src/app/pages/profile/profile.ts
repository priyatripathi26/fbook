import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../services/user';
import { TopBar } from "../../layouts/top-bar/top-bar";
import { PostArchive } from "../../layouts/post-archive/post-archive";
import { ProfileBlock } from '../../layouts/profile-block/profile-block';

@Component({
  selector: 'app-profile',
  imports: [TopBar, PostArchive, ProfileBlock],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  userId: any = '';

  constructor(
    private route: ActivatedRoute,
    private userService: User,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('Profile userId:', this.userId);

    let currentUserId = this.userService.getCurrentUserId();
    if (this.userId && currentUserId && this.userId === currentUserId) {
      this.router.navigate(['/my-posts']);
    }
  }

}
