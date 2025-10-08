import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

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

  getCurrentUser() {
    let user = localStorage.getItem('loggedInUser');
    if (!user) {
      return null;
    } else {
      let userData = JSON.parse(user);
      if(userData && userData.id) {
        return this.http.get<any[]>(`/api/users/${userData.id}`);
      } else {
        return null;
      }
    }
  }

  updateUser(id: number, changedData: any) {
    return this.http.patch<any>(`/api/users/${id}`, changedData);
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

  resetPassword(user: { email: string; password: string }): Observable<any> {
    const { email, password } = user;

    if (!email || !password) {
      return throwError(() => new Error('Email and password are required'));
    }

    return this.checkEmailExists(email.trim()).pipe(
      switchMap(existing => {
        if (existing.length === 0) {
          return throwError(() => new Error('Email does not exist'));
        }

        const userData = existing[0];
        return this.http.patch<any>(
          `http://localhost:3000/users/${userData.id}`,
          { password: password }
        );
      }),
      catchError(err => throwError(() => err))
    );
  }

}
