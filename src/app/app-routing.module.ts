import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from 'src/utils/custom-route-reuse-strategy.service';

// Modules
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { 
    path: 'posts', 
    loadChildren: () => import('./modules/posts/posts-routing.module').then(m => m.PostsRoutingModule)
  },
  { 
    path: 'random-posts', 
    loadChildren: () => import('./modules/random-posts/random-posts.module').then(m => m.RandomPostsModule),
    data: {
      saveComponent: true
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    data: {
      saveComponent: true,
      key: "users_module"
    }
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      saveComponent: true,
      key: "home_module"
    }
  },
  {
    path: '**',
    component: HomeComponent,
    data: {
      saveComponent: true,
      key: "home_module"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
})
export class AppRoutingModule { }
