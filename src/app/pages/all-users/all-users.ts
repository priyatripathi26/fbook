import { Component } from '@angular/core';
import { UsersArchive } from "../../layouts/users-archive/users-archive";
import { TopBar } from "../../layouts/top-bar/top-bar";

@Component({
  selector: 'app-all-users',
  imports: [UsersArchive, TopBar],
  templateUrl: './all-users.html',
  styleUrl: './all-users.css'
})
export class AllUsers {

}
