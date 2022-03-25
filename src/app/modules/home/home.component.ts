import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { Post } from '../posts/interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts!: Post[];

  constructor( private dataService: DataService ) { }

  ngOnInit(): void {
    console.log('%c *** HomeComponent -ngOnInit- ***', 'color:#bada55', this.posts);
    this.dataService.getPosts().subscribe(result => {
      this.posts = result;
    })
  }

}
