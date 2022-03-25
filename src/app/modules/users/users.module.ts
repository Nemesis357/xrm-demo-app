import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
  { 
    path: '', 
    component: UsersComponent
  },
  {
    path: ':id',
    component: UserComponent
  }
];

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
