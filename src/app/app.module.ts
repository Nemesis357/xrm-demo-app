import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MainmenuComponent } from './shared/components/mainmenu/mainmenu.component';
import { ExpansionPanelComponent } from './shared/components/expansion-panel/expansion-panel.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { RandomPostsComponent } from './modules/random-posts/random-posts.component';
import { DataService } from './modules/posts/services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    MainmenuComponent,
    ToolbarComponent,
    ExpansionPanelComponent,
    DialogComponent,
    RandomPostsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Material
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    DataService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
