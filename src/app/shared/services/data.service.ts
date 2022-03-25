import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROOT, POSTS, COMMENTS } from '../../../assets/routes';
import { Comment } from '../interfaces/comment';
import { Post } from 'src/app/modules/posts/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${ROOT}${POSTS}/${id}/${COMMENTS}`);
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${ROOT}${POSTS}`)
  }
}
