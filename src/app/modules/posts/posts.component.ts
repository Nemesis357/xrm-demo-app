import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Iframe } from 'src/app/shared/interfaces/iframe';
import { IframeService } from 'src/app/shared/services/iframe.service';
import { Post } from './interfaces/post';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] | undefined;
  hideComponent: boolean = true;
  constructor( 
    public dataService: DataService, 
    public router: Router,
    private route: ActivatedRoute,
    private iframeService: IframeService ) { }

  ngOnInit(): void {
    console.log('%c *** PostsComponent ngOnInit ***', 'color:#bada55', );
    
    this.loadPostData();

    if ( this.route.snapshot.data.independentComponent ) {
      // this.hideComponent = false;
      let payload : Iframe = {
        id: "postsIframe838747",
        name: "postsIframe",
        src: this.router.url
      }
      this.iframeService.addIframe(payload);
    }
  }

  loadPostData(): void {
    this.dataService.getPosts().subscribe(response  => {
      this.posts = response; //.splice(0, 10);
    })
  }

  loadPost(post: Post): void {
    this.router.navigate(['/posts/' + post.id ]);
  }

  goToUserProfile(post: Post): void {
    let payload = {
      userId: post.userId,
      randomUserId: Math.floor(1 * 10)
    }

    // let payload: NavigationExtras = {
    //   queryParams: { 'userId': post.userId },
    //   fragment: 'anchor'
    // };
    

    this.router.navigate(['/users', payload]);
  }
}
