import { Component, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('fbook');

  constructor(
    private authSer: Auth,
    private router: Router
  ) {
    if (!this.authSer.isLoggedIn()) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate([''])
    }
  }

}
