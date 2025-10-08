import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../services/user';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  fname = '';
  lname = '';
  email = '';
  password = '';
  cpassword = '';
  errorMsg = '';
  successMsg = '';

  constructor(private userService: User, private router: Router, private authService: Auth) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm) {
    this.errorMsg = '';
    this.successMsg = '';

    if (form.invalid) {
      this.errorMsg = 'Please fill all fields correctly.';
      return;
    }

    if (this.password !== this.cpassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    const newUser = {
      first_name: this.fname.trim(),
      last_name: this.lname.trim(),
      email: this.email.trim(),
      password: this.password.trim()
    };

    //check if email already exists
    this.userService.checkEmailExists(this.email.trim())
      .subscribe(existing => {
        if (existing.length > 0) {
          this.errorMsg = 'Email is already registered.';
        } else {
          //register the new user
          this.userService.register(newUser)
            .subscribe({
              next: () => {
                this.successMsg = 'Registration successful! Redirecting to login...';
                setTimeout(() => this.router.navigate(['/login']), 2000);
              },
              error: () => this.errorMsg = 'Server error. Try again.'
            });
        }
      });
  }

  onInput() {
    this.errorMsg = '';
    this.successMsg = '';
  }
}
