import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ROOT, POSTS, COMMENTS, USERS, PHOTOS } from '../../../assets/routes';
import { Comment } from '../interfaces/comment';
import { Post } from 'src/app/modules/posts/interfaces/post';
import { User } from '../interfaces/user';
import { Photo } from '../interfaces/photo';

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

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${ROOT}${USERS}/${userId}`)
  }

  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${ROOT}${PHOTOS}`);
  }
}
