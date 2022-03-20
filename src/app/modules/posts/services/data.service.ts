import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT, POSTS } from '../../../../assets/routes';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(ROOT + POSTS);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(ROOT + POSTS + '/' + id);
  }
}
