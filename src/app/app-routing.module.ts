import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from 'src/utils/custom-route-reuse-strategy.service';

// Modules
import { HomeComponent } from './modules/home/home.component';
import { CustomRouter } from './shared/modules/custom-router-module/custom-router.component';
import { ResolverService } from './shared/services/resolver.service';

const routes: Routes = [
  { 
    path: 'posts', 
    loadChildren: () => import('./modules/posts/posts-routing.module').then(m => m.PostsRoutingModule),
    data: {
      independentComponent: true,
      frame: {
        id: "postsIframe838747",
        name: "postsIframe",
        src: "/posts"
      }
    }
  },
  { 
    path: 'random-posts', 
    loadChildren: () => import('./modules/random-posts/random-posts.module').then(m => m.RandomPostsModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    // outlet: "users",
    data: {
      independentComponent: true,
      frame: {
        id: "usersIframe838747",
        name: "usersIframe",
        src: "/users"
      }
    }
  },
  {
    path: "home",
    component: HomeComponent,
    // resolve: { photos: ResolverService },
    // data: {
    //   independentComponent: true
    // }
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
  imports: [CustomRouter.forRoot(routes)],
  exports: [CustomRouter],
  providers: [{
      provide: RouteReuseStrategy,
      useClass: CustomRouteReuseStrategy
    }
  ],
})
export class AppRoutingModule { }
