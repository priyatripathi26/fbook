import { Component } from '@angular/core';
import { UsersArchive } from "../../layouts/users-archive/users-archive";
import { TopBar } from "../../layouts/top-bar/top-bar";
import { User } from '../../services/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  imports: [UsersArchive, TopBar],
  templateUrl: './all-users.html',
  styleUrl: './all-users.css'
})
export class AllUsers {
  constructor(
    private userService: User,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()?.subscribe((data: any) => {
      if (!data || !data.id || data.role !== 'admin') {

        this.router.navigate(['/login']);
      }
    }, error => {
      console.error('Error fetching current user:', error);
    });
  }
}
