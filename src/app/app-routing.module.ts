import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { HomeComponent } from './modules/home/home.component';
import { UsersComponent } from './modules/users/users.component';

const routes: Routes = [
  { 
    path: 'posts', 
    loadChildren: () => import('./modules/posts/posts-routing.module').then(m => m.PostsRoutingModule)
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
