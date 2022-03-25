import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Post } from 'src/app/modules/posts/interfaces/post';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  posts!: Post[];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post,
    private dataService: DataService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.dataService.getPosts().subscribe(result => {
      this.posts = result.filter(post => post.userId === this.data.userId);

      console.log('%c *** result ***', 'color:#bada55', this.posts);
    })
  }
}
