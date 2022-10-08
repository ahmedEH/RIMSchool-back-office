import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './dashboard/components/home/home.component';

import { IndexComponent } from './index/index.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { MenuService } from './services/menu.service';
import { AddUserComponent } from './dashboard/components/add-user/add-user.component';
import { UsersComponent } from './dashboard/components/users/users.component'; 
import { UserService } from './services/user.service';
import { CyclesComponent } from './dashboard/components/cycles/cycles.component';
import { AddCycleComponent } from './dashboard/components/add-cycle/add-cycle.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatListModule } from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { FacultiesComponent } from './dashboard/components/faculties/faculties.component';
import { SharedService } from './services/shared.service';


import {MatTabsModule} from '@angular/material/tabs';
import { DashboardModule } from './dashboard/dashboard.module';
import { BackButtonDirective } from './directives/back-button.directive';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './dashboard/components/messages/messages.component';
import { ActivatedRouteSnapshot } from '@angular/router';








@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    IndexComponent,
    AddUserComponent,
    UsersComponent,
    CyclesComponent,
    AddCycleComponent,
    FacultiesComponent,
    BackButtonDirective,








  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    DashboardModule,
    MatSlideToggleModule,
    CommonModule,
    



    
  ],

  providers: [
    AuthGuardService,
    AuthService,
    MenuService,
    UserService,
    SharedService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
