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
import { AuthGuardService } from '../services/auth-guard.service';
import { PermissionType } from '../enumerations/permissionType';

const routes: Routes = [
  // Sidenavwrapper Component acts like a shell & the active child Component gets rendered into the <router-outlet>
  {
    path: '',
    component: SidenavWrapperComponent,
    children: [

      {
        path: 'users',
        component: UsersComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeUsers}
      },
      {
        path: 'home',
        component: HomeComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.Home}
      },
      {
        path: 'add-user',
        component: AddUserComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddUser}
      },
      {
        path: 'cycles',
        component: CyclesComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeCycles}
      },
      {
        path: 'add-cycle',
        component: AddCycleComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddCycle}
      },
      {
        path: 'messages',
        component: MessagesComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeMessages}
      },
      {
        path: 'history',
        component: HistoryComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeHistory}
      },
      {
        path: 'cycles/:id',
        component: FacultiesComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeFaculties}
      },
      {
        path: 'cycle/add-faculty/:id',
        component: AddFacultyComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddFaculty}
      },
      {
        path: 'faculties/:id',
        component: FacultiesComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeFaculties}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty',
        component: LevelsComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeLevels}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level',
        component: MattersComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeMatters}
      },
      {
        path: 'faculty/add-level/:id',
        component: AddLevelComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddLevel}
      },
      {
        path: 'level/add-matter/:id',
        component: AddMatterComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddMatter}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter',
        component: MediasAndPostsComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeContent}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/medias',
        component: MediasComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeMedias}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/docs',
        component: DocsComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeeMedias}
      },
      {
        path: 'cycle/:cycle/faculty/:faculty/level/:level/matter/:matter/posts',
        component: PostsComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.SeePosts}
      },
      {
        path: 'matter/add-media/:id',
        component: AddMediaComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddMedia}
      },
      {
        path: 'matter/add-post/:id',
        component: AddPostComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddPost}
      },
      {
        path: 'matter/edit/:matter',
        component: AddMatterComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddMatter}
      },
      {
        path: 'level/edit/:level',
        component: AddLevelComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddLevel}
      },
      {
        path: 'faculty/edit/:faculty',
        component: AddFacultyComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddFaculty}
      },
      {
        path: 'cycle/edit/:cycle',
        component: AddCycleComponent,
        pathMatch:'full',
        canActivate:[AuthGuardService],
        data:{roles:PermissionType.AddCycle}
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
