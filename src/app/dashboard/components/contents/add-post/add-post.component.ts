import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Matter } from 'src/app/models/matter';
import { Post } from 'src/app/models/post';
import { MatterService } from 'src/app/services/matter.service';
import { PostService } from 'src/app/services/post.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  @Input() matter:number = 0;

  postForm= new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(5)]),
    text:new FormControl('',[Validators.required,Validators.minLength(5)])
    // file: new FormControl(null,Validators.required)
  });

  error:any;
  submitted = false;
  post:Post = new Post()
  router:Router;
  postService:PostService;
  sharedService:SharedService;
  matterI:Matter | undefined
  matterService:MatterService
  route:ActivatedRoute
  matterId:String | null

  constructor(router:Router,postService:PostService,sharedService:SharedService,matterService:MatterService,route:ActivatedRoute,private cd: ChangeDetectorRef) { 
    this.matterService = matterService;
    this.sharedService = sharedService
    this.route = route;
    this.postService = postService;
    this.sharedService = sharedService
    this.router = router

    this.matterId = this.route.snapshot.paramMap.get('matter');
    console.log("matterId",this.matterId);
    if(this.matterId != null){
      this.getMatter(+this.matterId);
    }
    console.log("matterI",this.matterI);
    

    
    // this.cycle = this.sharedService.cycle;
    // this.sharedService.cycle = this.cycle
    this.router = router;
    // this.cycleService = cycleService
    // this.cycle = this.sharedService.cycle
  }

  ngOnInit(): void {
  }
  isError(){
    return this.error === true;
  }

  onSubmit(){
    this.submitted = true;
    this.post = this.postForm.value
    this.post.created_at = new Date()
    this.post.matter = this.matterI

    console.log("title",this.postForm.controls['title']);
    
    console.log("this.post",this.post)


    console.log("media",this.post)
    console.log("mediaForm",this.postForm.value)

      this.postService.addPost(this.post).subscribe((val) =>{
        console.log("addCycle()hsahk;d",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })


    
  }
  getMatter(id?:number){
    this.matterService.getMatter(id).subscribe(
      (val) =>{
        console.log("getMatter",val);

          this.matterI = val.result

        
      }
    )
  }


}
