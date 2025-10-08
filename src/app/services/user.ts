import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(
    private http: HttpClient
  ) { }

  getUsers() {
    return this.http.get('/api/users');
  }

  register(user: any) {
    user.role = 'user';
    user.blocked = false;
    user.profile_picture = '';
    user.friends = [];
    user.sent_friend_requests = [];
    user.received_friend_requests = [];

    return this.http.post<any>('/api/users', user);
  }

  checkEmailExists(email: string) {
    return this.http.get<any[]>(`/api/users?email=${email}`);
  }

}
