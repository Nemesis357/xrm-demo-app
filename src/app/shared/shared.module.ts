import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RandomContentComponent } from './components/random-content/random-content.component';
import { RouterOutlet } from './directives/router-outlet.directive';

@NgModule({
  declarations: [
    RandomContentComponent,
    RouterOutlet,
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule
  ],
  exports: [
    RandomContentComponent,
    RouterOutlet
  ]
})
export class SharedModule { }
