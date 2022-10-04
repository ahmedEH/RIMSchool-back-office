import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { SharedService } from '../services/shared.service';
import { AddLevelComponent } from './components/add-level/add-level.component';
import { LevelsComponent } from './components/levels/levels.component';
import { MattersComponent } from './components/matters/matters.component';
import { AddMatterComponent } from './components/add-matter/add-matter.component';
import { MediasAndPostsComponent } from './components/contents/medias-and-posts/medias-and-posts.component';
import { AddMediaComponent } from './components/contents/add-media/add-media.component';
import { AddPostComponent } from './components/contents/add-post/add-post.component';
import { MediasComponent } from './components/contents/medias/medias.component';
import { PostsComponent } from './components/contents/posts/posts.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocsComponent } from './contents/docs/docs.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HistoryComponent } from './components/history/history.component';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MessagesComponent } from './components/messages/messages.component';
import { AuthService } from '../services/auth.service';
@NgModule({
  declarations: [SidenavWrapperComponent, AddFacultyComponent,AddLevelComponent, LevelsComponent, MattersComponent, AddMatterComponent, MediasAndPostsComponent, AddMediaComponent, AddPostComponent, MediasComponent, PostsComponent, DocsComponent, HistoryComponent, MessagesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    // NG Material Modules
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    PdfViewerModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    CommonModule


  ],

  providers:[SharedService,AuthService],

  exports:      [ SidenavWrapperComponent],
  bootstrap:    [ SidenavWrapperComponent]
})
export class DashboardModule { }
