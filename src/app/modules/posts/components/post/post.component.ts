import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post | undefined;
  constructor( 
    private route: ActivatedRoute, 
    private dataService: DataService,
    private router: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.dataService.getPost(params["id"]).subscribe(result => {
        this.post = result;
      })
    });
  }

  backToPosts(): void {
    this.router.navigate(['/posts']);
  }
}
