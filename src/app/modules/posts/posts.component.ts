import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from './interfaces/post';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] | undefined;
  constructor( private dataService: DataService, private router: Router ) { }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(response  => {
      this.posts = response.splice(0, 10);
    })
  }

  loadPost(post: Post): void {
    this.router.navigate(['/posts/' + post.id ]);
  }
}
