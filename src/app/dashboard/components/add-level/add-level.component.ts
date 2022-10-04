import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Faculty } from 'src/app/models/faculty';
import { Level } from 'src/app/models/level';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { LevelService } from 'src/app/services/level.service';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common'
@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.scss']
})
export class AddLevelComponent implements OnInit {

  error:any;
  submitted = false;
  level:Level = new Level()
  router:Router;
  levelService:LevelService;
  sharedService:SharedService;
  faculty:Faculty | undefined
  facultyService:FacultyService
  route:ActivatedRoute
  facultyId:String | null
  title = "Add Level";
  name = ''
  edit = false;

  constructor(router:Router,facultyService:FacultyService,sharedService:SharedService,
    cycleService:CycleService,route:ActivatedRoute,levelService:LevelService,private location:Location) { 
    this.facultyService = facultyService;
    this.sharedService = sharedService
    this.route = route;
    this.sharedService = sharedService
    this.router = router
    this.levelService = levelService

    this.facultyId = this.route.snapshot.paramMap.get('id');
    console.log("levelfrom",this.level);
    if(this.facultyId != null){
      this.getFaculty(+this.facultyId);
    }

    
    this.faculty = this.sharedService.faculty;
    this.sharedService.faculty = this.faculty
    this.router = router;
    this.facultyService = facultyService
    this.faculty = this.sharedService.faculty
  }

  ngOnInit(): void {

    console.log("this.router", this.route.snapshot.routeConfig?.path?.includes('edit'));
    if( this.route.snapshot.routeConfig?.path?.includes('edit')){
      this.edit = true
      this.title = "Modify Level"
      const levelId = this.route.snapshot.paramMap.get('level');
      console.log("this.levelId: ",levelId);
      
      if(levelId != null){
        this.levelService.getLevel(+levelId).subscribe((val) =>{
          this.level = val.result;
          console.log("this.level: ",this.level);
           this.name = (this.level.name != null)? this.level.name : '';
        })
      }
    }
  }
  isError(){
    return this.error === true;
  }

  onSubmit(){
    if(this.edit){
      this.submitted = true;
      this.level.name = this.levelForm.controls['name'].value;
      console.log("level",this.level)
      console.log("edit : ",this.level);
      this.levelService.editLevel(this.level).subscribe((val) =>{
        console.log("editlevel()",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })
      
      
    }else{
    this.submitted = true;
    this.level.name = this.levelForm.controls['name'].value;
    this.level.created_at = new Date();
    this.level.faculty = this.faculty;
    console.log("level",this.level)

    this.levelService.addLevel(this.level).subscribe((val) =>{
      console.log("addLevel()",val)
      this.error = false;
    },
    (error) =>{
      this.error = true;
    })
  }
  }
  getFaculty(id?:number){
    this.facultyService.getFaculty(id).subscribe(
      (val) =>{
        console.log(val);
        if(this.faculty == undefined){
          this.faculty = val.result
        }
        
      }
    )
  }

  levelForm= new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(2)]),
  });

}
