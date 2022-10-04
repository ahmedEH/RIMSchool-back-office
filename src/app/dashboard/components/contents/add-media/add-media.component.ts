import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaType } from 'src/app/enumerations/mediaType';
import { Matter } from 'src/app/models/matter';
import { Media } from 'src/app/models/media';
import { MatterService } from 'src/app/services/matter.service';
import { MediaService } from 'src/app/services/media.service';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common';
import { MediasComponent } from '../medias/medias.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {


  @Input() matter:number = 0;
  mediaForm= new FormGroup({
    title: new FormControl('',[Validators.required,Validators.minLength(5)]),
    file: new FormControl(null,Validators.required)
  });
  file:File | undefined;
  fileAngular:string | undefined
  error:any;
  submitted = false;
  media:Media = new Media()
  router:Router;
  mediaService:MediaService;
  sharedService:SharedService;
  matterI:Matter | undefined
  matterService:MatterService
  route:ActivatedRoute
  matterId:String | null
  acceptUpload: boolean = true;

  constructor(

    private location:Location, router:Router,mediaService:MediaService,sharedService:SharedService,matterService:MatterService,route:ActivatedRoute,private cd: ChangeDetectorRef) { 
    this.matterService = matterService;
    this.sharedService = sharedService
    this.route = route;
    this.mediaService = mediaService;
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
    console.log("I am on submit of add media");
    
    this.submitted = true;
    this.media = this.mediaForm.value
    this.media.path = "hkhl";
    this.media.type = MediaType.Audio
    this.media.created_at = new Date();
    this.media.matter = this.matterI;
    console.log("name",this.mediaForm.controls['title']);
    
    console.log("this.media",this.media)
    const formData  = new FormData();
    console.log("formData1",formData);
    
    if(this.file != undefined){
      console.log("file not undefined");
      formData.append("file",this.file);
      console.log("formData2",formData);
      formData.append("media",JSON.stringify(this.media));
      console.log("formData3",formData);
    }else{
      console.log("file undefined");
    }

    console.log("media",this.media)
    console.log("mediaForm",this.mediaForm.value)
    if(this.file != undefined){
      this.mediaService.addMedia(formData).subscribe((val) =>{
        console.log("addCycle()hsahk;d",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })
    }else{
      console.log("ELSE");
      
    }
    console.log("I am on submit of add media");
    
  }
  getMatter(id?:number){
    this.matterService.getMatter(id).subscribe(
      (val) =>{
        console.log("getMatter",val);

          this.matterI = val.result

        
      }
    )
  }

  onFileChange(event:any) {

    const file = event.target.files[0];
    console.log("file " ,file);
    this.file = file;
    const fileType = file.type
    console.log("media ",fileType);

    const regExp1:RegExp = new RegExp(/application/);
    const regExp2:RegExp = new RegExp(/image/);


      let test1 = regExp1.test(fileType);
      let test2 = regExp2.test(fileType);
      if(!(test1 || test2)){
        this.acceptUpload= false
      }
      else{
        this.acceptUpload = true;
      }

    
  } 



}
