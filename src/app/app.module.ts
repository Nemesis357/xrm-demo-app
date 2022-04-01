import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ExpansionPanelComponent } from './shared/components/expansion-panel/expansion-panel.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './shared/components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { RandomPostsComponent } from './modules/random-posts/random-posts.component';
import { DataService } from './modules/posts/services/data.service';
import { IframeService } from './shared/services/iframe.service';
import { SafeUrlPipe } from './shared/pipes/safe-url.pipe';
import { HomeModule } from './modules/home/home.module';
import { MatTreeModule } from '@angular/material/tree';
import { UiModule } from './shared/modules/ui/ui.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent,
    ExpansionPanelComponent,
    DialogComponent,
    RandomPostsComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule,
    HomeModule,
    UiModule,
    MatTreeModule,

    // Material
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule
  ],
  providers: [
    DataService,
    IframeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
