import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Cycle } from 'src/app/models/cycle';
import { Faculty } from 'src/app/models/faculty';
import { Level } from 'src/app/models/level';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { LevelService } from 'src/app/services/level.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

  levels:Level[] = [];
  route:ActivatedRoute;
  levelService:LevelService;
  cycleId:string | null
  cycleService:CycleService
  facultyId:string | null
  sharedService:SharedService
  cycle:Cycle | undefined;
  router:Router 
  faculty:Faculty | undefined
  facultyService:FacultyService | undefined
  level : Level | undefined
  levelId:string | null

  AddLevel = PermissionType.AddLevel
  SeeMatters = PermissionType.SeeMatters
  UpdateLevel = PermissionType.UpdateLevel
  DeleteLevel = PermissionType.DeleteLevel

  constructor(private authService:AuthService, route:ActivatedRoute,cycleService:CycleService,sharedService:SharedService,router:Router,levelService:LevelService,facultyService:FacultyService) { 
    this.route = route;
    this.cycleService = cycleService;
    this.sharedService = sharedService
    this.router = router
    this.levelService = levelService
    this.facultyService = facultyService

    this.cycleId = this.route.snapshot.paramMap.get('cycle');
    this.facultyId = this.route.snapshot.paramMap.get('faculty');
    this.levelId = this.route.snapshot.paramMap.get('level');
    console.log("cyclefrom",this.cycle);
    if(this.facultyId != null){
      console.log("getFaculty for show",this.faculty);
      
      this.getFaculty(+this.facultyId);
    }
    if(this.cycleId != null){
      this.getCycle(+this.cycleId);
    }
    if(this.levelId != null){
      this.getLevel(+this.levelId);
    }

    console.log("userTokenLevel",sessionStorage.getItem("userToken"));
    
    this.cycle = this.sharedService.cycle;
    this.sharedService.cycle = this.cycle
  }

  ngOnInit(): void {
    if(this.facultyId != null){
      this.facultyService?.getLevels(+this.facultyId).subscribe(
        (val) =>{
          console.log("faculties for cycle "+this.cycleId,val)
          this.levels = val.result
        }
      )
    }

  }
  getFaculty(id?:number){
    this.facultyService?.getFaculty(id).subscribe(
      (val) =>{
        console.log("getFaculty to show",val);
        if(this.faculty == undefined){
          this.faculty = val.result
        }
        
      }
    )
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
  getMatters(level?:Level){
    this.sharedService.level = level;
    console.log("this.sharedService.faculty",this.sharedService.faculty);
    this.router.navigate(['cycle',this.cycle?.id,'faculty',this.faculty?.id,'level',level?.id])

    

  }
  // navigate(){
  //   this.router?.navigate(["cycle/add-faculty",this.cycleId])
  // }

  deleteLevel(id?:number){
    console.log("i am here")
    this.levelService?.deleteLevel(id).subscribe(
      (val) =>{
        console.log("delete",val)
        if(this.facultyId != null){
          this.facultyService?.getLevels(+this.facultyId).subscribe(
            (val) =>{
              console.log("faculties for cycle "+this.cycleId,val)
              this.levels = val.result
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
    return this.authService.isAdministrator();
  }


}
