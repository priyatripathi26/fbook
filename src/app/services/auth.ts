import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    if(!email || !password) {
      return new Observable(observer => {
        observer.error('Email and password are required');
      });
    }
    return this.http.get(`/api/users?email=${email}&password=${password}`)
  }

  logout() {
    localStorage.removeItem('loggedInUser');
  }

  isLoggedIn(): boolean {
    let loggedInUser = localStorage.getItem('loggedInUser');
    if(loggedInUser && loggedInUser != null) {
      let loggedInUserJson = JSON.parse(loggedInUser);
      if(loggedInUserJson.id && loggedInUserJson.id) {
        return true;
      }
    }
    return false;
  }

  getUsers() {
    return this.http.get('/api/users');
  }

}
