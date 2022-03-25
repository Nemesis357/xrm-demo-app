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
  constructor( public dataService: DataService, public router: Router ) { }

  ngOnInit(): void {
    console.log('%c *** PostsComponent ngOnInit ***', 'color:#bada55', );
    
    this.loadPostData();
  }

  loadPostData(): void {
    this.dataService.getPosts().subscribe(response  => {
      this.posts = response.splice(0, 10);
    })
  }

  loadPost(post: Post): void {
    this.router.navigate(['/posts/' + post.id ]);
  }
}
