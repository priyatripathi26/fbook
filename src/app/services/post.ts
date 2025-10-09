import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class Post {
  constructor(
    private http: HttpClient,
    private userService: User
  ) { }

  getPosts(userId: any = '') {
    return this.http.get<any[]>(`/api/posts/?userId=${userId}`);
  }

  updatePost(id: any, changedData: any) {
    return this.http.patch<any>(`/api/posts/${id}`, changedData);
  }

  createPost(newPost: any) {
    newPost.likesUserIds = [];
    newPost.hidden = false;
    newPost.blocked = false;
    newPost.timestamp = Date.now();
    return this.http.post<any>(`/api/posts`, newPost);
  }

  deletePost(id: any) {
    return this.http.delete<any>(`/api/posts/${id}`);
  }

}
