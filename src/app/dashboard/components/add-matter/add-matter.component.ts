import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from 'src/app/models/level';
import { Matter } from 'src/app/models/matter';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { LevelService } from 'src/app/services/level.service';
import { MatterService } from 'src/app/services/matter.service';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-add-matter',
  templateUrl: './add-matter.component.html',
  styleUrls: ['./add-matter.component.scss']
})
export class AddMatterComponent implements OnInit {


  error:any;
  submitted = false;
  matter:Matter = new Matter()
  router:Router;
  matterService:MatterService;
  sharedService:SharedService;
  level:Level | undefined
  levelService:LevelService
  route:ActivatedRoute
  levelId:String | null
  value:string | undefined
  title = "Add matter";
  name = ''
  edit = false;

  constructor(router:Router,facultyService:FacultyService,levelService:LevelService,private location:Location,
    sharedService:SharedService,cycleService:CycleService,route:ActivatedRoute,matterService:MatterService) { 
    this.levelService = levelService;
    this.sharedService = sharedService
    this.route = route;
    this.matterService = matterService;
    this.sharedService = sharedService
    this.router = router

    this.levelId = this.route.snapshot.paramMap.get('id');
    console.log("levelfrom",this.level);
    if(this.levelId != null){
      this.getLevel(+this.levelId);
    }

    
    this.level = this.sharedService.level;
    this.sharedService.level = this.level
    this.router = router;
    this.level = this.sharedService.level
  }

  ngOnInit(): void {

    console.log("this.router", this.route.snapshot.routeConfig?.path?.includes('edit'));
    if( this.route.snapshot.routeConfig?.path?.includes('edit')){
      this.edit = true
      this.title = "Modify matter"
      const matterId = this.route.snapshot.paramMap.get('matter');
      console.log("this.matterId: ",matterId);
      
      if(matterId != null){
        this.matterService.getMatter(+matterId).subscribe((val) =>{
          this.matter = val.result;
          console.log("this.matter: ",this.matter);
           this.name = (this.matter.name != null)? this.matter.name : '';
        })
      }
    }
    else{
      this.title = "Add matter"
    }
  }
  isError(){
    return this.error === true;
  }

  onSubmit(){
    if(this.edit){
      this.submitted = true;
      this.matter.name = this.matterForm.controls['name'].value;
      console.log("matter",this.matter)
      console.log("edit : ",this.matter);
      this.matterService.editMatter(this.matter).subscribe((val) =>{
        console.log("editmatter()",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })
      
      
    }else{
    this.submitted = true;
    this.matter.name = this.matterForm.controls['name'].value;
    this.matter.created_at = new Date();
    this.matter.level = this.level;
    console.log("matter",this.matter)

    this.matterService.addMatter(this.matter).subscribe((val) =>{
      console.log("addMatter()",val)
      this.error = false;
    },
    (error) =>{
      this.error = true;
    });
  }
    
  }
  getLevel(id?:number){
    this.levelService.getLevel(id).subscribe(
      (val) =>{
        console.log(val);
        if(this.level == undefined){
          this.level= val.result
        }
        
      }
    )
  }

  matterForm= new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(5)]),
  });


}
