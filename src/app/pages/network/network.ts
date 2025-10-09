import { Component } from '@angular/core';
import { TopBar } from "../../layouts/top-bar/top-bar";
import { UsersArchive } from '../../layouts/users-archive/users-archive';

@Component({
  selector: 'app-network',
  imports: [TopBar, UsersArchive],
  templateUrl: './network.html',
  styleUrl: './network.css'
})
export class Network {

}
