
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from "./posts.component";
import {MatCardModule} from '@angular/material/card';
import { PostComponent } from './components/post/post.component';

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
        PostComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
  })
  export class PostsRoutingModule { }