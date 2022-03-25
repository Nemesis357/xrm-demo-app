
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from "./posts.component";
import {MatCardModule} from '@angular/material/card';
import { PostComponent } from './components/post/post.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommentsComponent } from 'src/app/shared/components/comments/comments.component';

const routes: Routes = [
    { 
      path: '', 
      component: PostsComponent 
    },
    {
        path: ':id',
        component: PostComponent
    }
  ];
  
  @NgModule({
    declarations: [
        PostsComponent,
        PostComponent,
        CommentsComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PostsRoutingModule { }