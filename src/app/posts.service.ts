import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private ROOT_URL = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(`${this.ROOT_URL}/posts`);
  }
}
