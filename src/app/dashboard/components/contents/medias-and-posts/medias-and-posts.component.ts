import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { AuthService } from 'src/app/services/auth.service';
import { MediasComponent } from '../medias/medias.component';

@Component({
  selector: 'app-medias-and-posts',
  templateUrl: './medias-and-posts.component.html',
  styleUrls: ['./medias-and-posts.component.scss']
})
export class MediasAndPostsComponent implements OnInit {
  route:ActivatedRoute
  matterId:string | null
  matter:number =0;
  SeeMedias = PermissionType.SeeMedias
  SeePosts = PermissionType.SeePosts
  AddMedia = PermissionType.AddMedia
  AddPost = PermissionType.AddPost



  constructor(route:ActivatedRoute,private authService:AuthService) { 
    this.route = route
    this.matterId = this.route.snapshot.paramMap.get('matter');
    console.log("matterId : ",this.matterId)
    if(this.matterId != null) this.matter = +this.matterId;
    else this.matter = 0;
    console.log("matter : ",this.matter)


  }

  ngOnInit(): void {
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }
  
isPermitted(p:PermissionType){
  return this.authService.isPermitted(p);
}

isAdministrator(){
  return this.authService.isAdministrator();
}


}
