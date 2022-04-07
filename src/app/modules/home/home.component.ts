import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/shared/interfaces/photo';
import { DataService } from 'src/app/shared/services/data.service';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { Post } from '../posts/interfaces/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts!: Post[];
  photos!: Photo[];

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService ) { }

  ngOnInit(): void {
    console.log('%c *** HomeComponent -ngOnInit- ***', 'color:#bada55', this.posts);
    this.dataService.getPosts().subscribe(result => {
      this.posts = result;
    })

    this.route.queryParams.subscribe(params => {
      console.log('%c *** queryParams ***', 'color:#bada55', params);
    });

    this.route.data.subscribe((response: any) => {
      this.photos = response;
    });
  }

}
