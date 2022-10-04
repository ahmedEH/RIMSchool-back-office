import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { AddCycleComponent } from './components/add-cycle/add-cycle.component';
import { AddFacultyComponent } from './components/add-faculty/add-faculty.component';
import { AddLevelComponent } from './components/add-level/add-level.component';
import { AddMatterComponent } from './components/add-matter/add-matter.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { CyclesComponent } from './components/cycles/cycles.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { HomeComponent } from './components/home/home.component';
import { LevelsComponent } from './components/levels/levels.component';
import { MattersComponent } from './components/matters/matters.component';
import { MediasAndPostsComponent } from './components/contents/medias-and-posts/medias-and-posts.component';
import { MediasComponent } from './components/contents/medias/medias.component';

import { SidenavWrapperComponent } from './components/sidenav-wrapper/sidenav-wrapper.component';
import { UsersComponent } from './components/users/users.component';
import { PostsComponent } from './components/contents/posts/posts.component';
import { AddMediaComponent } from './components/contents/add-media/add-media.component';
import { AddPostComponent } from './components/contents/add-post/add-post.component';
import { DocsComponent } from './contents/docs/docs.component';
import { HistoryComponent } from './components/history/history.component';
import { MessagesComponent } from './components/messages/messages.component';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [

      {
        path: 'users',
        component: UsersComponent,
        pathMatch:'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch:'full'
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        pathMatch:'full'
      },
      {
        path: 'cycles',
        component: CyclesComponent,
        pathMatch:'full'
      },
      {
        path: 'add-cycle',
        component: AddCycleComponent,
        pathMatch:'full'
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch:'full'
      },
      {
        path: 'history',
        component: HistoryComponent,
        pathMatch:'full'
      },
      {
        path: 'cycles/:id',
        component: FacultiesComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/add-faculty/:id',
        component: AddFacultyComponent,
        pathMatch:'full'
      },
      {
        path: 'faculties/:id',
        component: FacultiesComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty',
        component: LevelsComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level',
        component: MattersComponent,
        pathMatch:'full'
      },
      {
        path: 'faculty/add-level/:id',
        component: AddLevelComponent,
        pathMatch:'full'
      },
      {
        path: 'level/add-matter/:id',
        component: AddMatterComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter',
        component: MediasAndPostsComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/medias',
        component: MediasComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/docs',
        component: DocsComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/posts',
        component: PostsComponent,
        pathMatch:'full'
      },
      {
        path: 'matter/add-media/:id',
        component: AddMediaComponent,
        pathMatch:'full'
      },
      {
        path: 'matter/add-post/:id',
        component: AddPostComponent,
        pathMatch:'full'
      },
      {
        path: 'matter/edit/:matter',
        component: AddMatterComponent,
        pathMatch:'full'
      },
      {
        path: 'level/edit/:level',
        component: AddLevelComponent,
        pathMatch:'full'
      },
      {
        path: 'faculty/edit/:faculty',
        component: AddFacultyComponent,
        pathMatch:'full'
      },
      {
        path: 'cycle/edit/:cycle',
        component: AddCycleComponent,
        pathMatch:'full'
      },
    ]
  },

  {
    path: 'not-found',
    component: NotFoundComponent,
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
