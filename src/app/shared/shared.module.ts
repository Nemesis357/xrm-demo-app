import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RandomContentComponent } from './components/random-content/random-content.component';

@NgModule({
  declarations: [
    RandomContentComponent,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule
  ],
  exports: [
    RandomContentComponent
  ]
})
export class SharedModule { }
