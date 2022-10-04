import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Cycle } from 'src/app/models/cycle';
import { Faculty } from 'src/app/models/faculty';
import { Level } from 'src/app/models/level';
import { Matter } from 'src/app/models/matter';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { LevelService } from 'src/app/services/level.service';
import { MatterService } from 'src/app/services/matter.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-matters',
  templateUrl: './matters.component.html',
  styleUrls: ['./matters.component.scss']
})
export class MattersComponent implements OnInit {

  matters:Matter[] = [];
  route:ActivatedRoute;
  matterService:MatterService;
  cycleId:string | null
  cycleService:CycleService
  facultyId:string | null
  sharedService:SharedService
  cycle:Cycle | undefined;
  router:Router | undefined
  faculty:Faculty | undefined
  facultyService:FacultyService 
  levelService:LevelService;
  level:Level | undefined
  levelId:string | null;
  AddMatter = PermissionType.AddMatter
  DeleteMAtter = PermissionType.DeleteMatter
  UpdateMatter = PermissionType.UpdateMatter
  SeeContent = PermissionType.SeeContent;


  constructor(private authService:AuthService,route:ActivatedRoute,cycleService:CycleService,sharedService:SharedService,router:Router,levelService:LevelService,facultyService:FacultyService,matterService:MatterService) { 
    this.route = route;
    this.cycleService = cycleService;
    this.sharedService = sharedService
    this.router = router
    this.levelService = levelService
    this.facultyService = facultyService
    this.matterService = matterService

    this.cycleId = this.route.snapshot.paramMap.get('cycle');
    this.facultyId = this.route.snapshot.paramMap.get('faculty');
    this.levelId = this.route.snapshot.paramMap.get('level');
    console.log("cyclefrom",this.cycle);
    if(this.facultyId != null){
      this.getFaculty(+this.facultyId);
    }
    if(this.cycleId != null){
      this.getCycle(+this.cycleId);
    }
    if(this.levelId != null){
      this.getLevel(+this.levelId);
    }

    
    this.cycle = this.sharedService.cycle;
    this.sharedService.cycle = this.cycle
  }

  ngOnInit(): void {
    if(this.levelId != null){
      this.levelService?.getMatters(+this.levelId).subscribe(
        (val) =>{
          console.log("faculties for cycle "+this.cycleId,val)
          this.matters = val.result
        }
      )
    }

  }
  getLevel(id?:number){
    this.levelService?.getLevel(id).subscribe(
      (val) =>{
        console.log(val);
        if(this.level == undefined){
          this.level = val.result
        }
        
      }
    )
  }
  getCycle(id?:number){
    this.cycleService.getCycle(id).subscribe(
      (val) =>{
        console.log(val);
        if(this.cycle == undefined){
          this.cycle = val.result
        }
        
      }
    )
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
  deleteMatter(id?:number){
    console.log("i am here")
    this.matterService?.deleteMatter(id).subscribe(
      (val) =>{
        console.log("delete",val)
        if(this.levelId != null){
          this.levelService?.getMatters(+this.levelId).subscribe(
            (val) =>{
              console.log("faculties for cycle "+this.cycleId,val)
              this.matters = val.result
            }
          )
        }
      },
      (error) =>{
        console.log("deleteError",error)
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
