import { Component } from '@angular/core';
import { User } from '../services/user';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  imports: [RouterModule, NgIf, FormsModule, CommonModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  password = '';
  cpassword = '';
  errorMsg = '';
  successMsg = '';
  step = 1;
  otp = '';

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
      email: this.email.trim(),
      password: this.password.trim()
    };

    this.userService.resetPassword(newUser)
      .subscribe({
        next: () => {
          this.successMsg = 'Password changed successfully! Redirecting to login...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => this.errorMsg = err.message || 'Failed to reset password'
      });
  }

  sendOtp() {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.email) {
      this.errorMsg = 'Please enter your email.';
      return;
    }

    this.userService.checkEmailExists(this.email.trim())
      .subscribe(existing => {
        if (existing.length === 0) {
          this.errorMsg = 'Email not found. Please register first.';
        } else {
          this.successMsg = 'OTP sent to your email. Please check your inbox.';
          this.errorMsg = '';
          this.step = 2;
        }
      });
  }

  enterOtp() {
    this.errorMsg = '';
    this.successMsg = '';
    this.successMsg = 'OTP verified. You can now reset your password.';
    this.errorMsg = '';
    this.step = 3;
  }

  onInput() {
    this.errorMsg = '';
    this.successMsg = '';
  }
}
