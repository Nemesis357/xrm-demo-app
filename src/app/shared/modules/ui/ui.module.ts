import { NgModule } from '@angular/core';
import { ToolbarComponent } from '../../components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainmenuComponent } from '../../components/mainmenu/mainmenu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ToolbarComponent,
    MainmenuComponent
  ],
  imports: [
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTreeModule,
    MatButtonModule
  ],
  exports: [
    ToolbarComponent,
    MainmenuComponent
  ]
})
export class UiModule { }
