import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionType } from './enumerations/permissionType';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path:'login',
    component:IndexComponent,
    pathMatch:'full'
  },
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[AuthGuardService],
    data:{roles:PermissionType.Home}
  },
  // {
  //   path:'not-found',
  //   component:NotFoundComponent,
  //   pathMatch:'full'
  // },
  // {
  //   path: '**',
  //   redirectTo: 'not-found',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
