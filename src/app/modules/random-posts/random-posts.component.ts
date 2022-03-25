import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { DataService } from '../posts/services/data.service';

@Component({
  selector: 'app-random-posts',
  templateUrl: './random-posts.component.html',
  styleUrls: ['./random-posts.component.scss']
})
export class RandomPostsComponent extends PostsComponent implements OnInit {
  
  constructor(private data: DataService, private rt: Router) {
    super(data, rt);
  }

  ngOnInit(): void {
    console.log('%c *** ngOnInit in RandomPosts Component ***', 'color:#bada55', this.posts);
    this.loadPostData();
  }

  loadPostData(): void {
    this.data.getPosts().subscribe(response  => {
      let random = Math.floor(Math.random() * 90);
      this.posts = response.slice(random, random + 10);
    })

    // this.posts = this.data.posts;
  }

}
