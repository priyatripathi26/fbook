import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Post {
  constructor(
    private http: HttpClient
  ) { }

  getPosts(userId: any = '') {
    return this.http.get<any[]>(`/api/posts/?userId=${userId}`);
  }

  updatePost(id: any, changedData: any) {
    return this.http.patch<any>(`/api/posts/${id}`, changedData);
  }

}
