import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { TopBar } from '../layouts/top-bar/top-bar';
import { PostArchive } from "../layouts/post-archive/post-archive";

@Component({
  selector: 'app-home',
  imports: [TopBar, PostArchive],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
