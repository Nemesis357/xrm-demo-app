import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../interfaces/comment';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() postId: number = 0;
  comments: Comment[] | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getComments(this.postId).subscribe(result => {
      this.comments = result;
    })
  }

}
