import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = '';
  password: string = '';
  errorMsg: string = '';

  constructor(
    private authService: Auth,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.errorMsg = 'Please fill in the form correctly.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (user: any) => {
        console.log(user);
        if (user && user[0] && user[0].id) {
          if (user[0].blocked) {
            this.errorMsg = 'Your account has been blocked. Please contact the administrator.';
            return;
          }
          localStorage.setItem('loggedInUser', JSON.stringify(user[0]));
          this.errorMsg = '';
          this.router.navigate(['/']);
        } else {
          this.errorMsg = 'Invalid email or password';
        }
      },
      error: (err) => {
        this.errorMsg = err;
      }
    });
  }

  onInput() {
    this.errorMsg = '';
  }


}
