import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Matter } from 'src/app/models/matter';
import { Post } from 'src/app/models/post';
import { AuthService } from 'src/app/services/auth.service';
import { MatterService } from 'src/app/services/matter.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() matter:number = 0;

  matterI:Matter = new Matter()

  posts:Post[] = []

  matterId:string|null;

  postService:PostService

  router:Router

  route:ActivatedRoute

  matterService: MatterService

  url = "/home/ahmed/stage_PFE/schoolroom/src/main/resources/uploads/"

  DeletePost = PermissionType.DeletePost




  constructor(private authService:AuthService, postService:PostService,router:Router,route:ActivatedRoute,matterService:MatterService) {


    // window.location.reload();
    this.postService = postService;

    this.router = router;

    this.route = route

    this.matterService = matterService

    this.matterId = this.route.snapshot.paramMap.get('matter');
    console.log("matterId",this.matterId);
    if(this.matterId != null){
      this.getMatter(+this.matterId);
    }
    console.log("matterI",this.matterI);

    if(this.matterId != null){
      this.postService.getPosts(+this.matterId).subscribe((val) =>{
        this.posts = val.result
        console.log("mediasContents",this.posts)
        console.log("HAPPY")
      })
    }

    
   }

  ngOnInit(): void {
  }
  getMatter(id?:number){
    this.matterService.getMatter(id).subscribe(
      (val) =>{
        console.log("getMatter",val);

          this.matterI = val.result

        
      }
    )
  }
  deletePost(id?:number){
    console.log("i am here")
    this.postService?.deletePost(id).subscribe(
      (val) =>{
        console.log("delete",val)
        if(this.matterId != null){
          this.postService.getPosts(+this.matterId).subscribe((val) =>{
            this.posts = val.result
            console.log("mediasContents",this.posts)
            console.log("HAPPY")
          })
        }

      },
      (err) =>{
        console.log("deleteError",err)
      },
      ()=>{
        console.log("complete")
      }
    )

  }

  isPermitted(p:PermissionType){
    return this.authService.isPermitted(p);
  }

  isAdministrator(){
    return this.authService.isAdministrator()
  }
}
