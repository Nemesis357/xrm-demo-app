import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT, POSTS } from '../../../../assets/routes';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';
import { dataServiceInterface } from '../interfaces/dataServiceInterface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements dataServiceInterface {
  constructor(private http: HttpClient) { }
  private _posts: Post[] = [];
  public get posts(): Post[] {
    return this._posts;
  }
  public set posts(value: Post[]) {
    this._posts = value;
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(ROOT + POSTS);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(ROOT + POSTS + '/' + id);
  }
}
