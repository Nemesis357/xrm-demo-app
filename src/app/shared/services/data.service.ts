import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private root: string = "https://jsonplaceholder.typicode.com/";
  constructor(private http: HttpClient) { }

  // getPosts(): Observable<Post[]> {
  //   return this.http.get<Post[]>(this.root + 'posts');
  // }
}
