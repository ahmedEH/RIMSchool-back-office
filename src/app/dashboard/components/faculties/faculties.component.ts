import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Cycle } from 'src/app/models/cycle';
import { Faculty } from 'src/app/models/faculty';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss']
})
export class FacultiesComponent implements OnInit {

  faculties:Faculty[] = [];
  route:ActivatedRoute;
  cycleService:CycleService;
  cycleId:string | null
  sharedService:SharedService
  cycle:Cycle | undefined;
  router:Router ;
  facultyService:FacultyService
  AddFaculty = PermissionType.AddFaculty
  SeeLevels = PermissionType.SeeLevels
  UpdateFaculty = PermissionType.UpdateFaculty;
  DeleteFaculty = PermissionType.DeleteFaculty

  constructor(private authService:AuthService, route:ActivatedRoute,cycleService:CycleService,sharedService:SharedService,router:Router,facultyService:FacultyService,private navigation: NavigationService) { 
    this.route = route;
    this.cycleService = cycleService;
    this.sharedService = sharedService
    this.router = router
    this.facultyService = facultyService

    this.cycleId = this.route.snapshot.paramMap.get('id');
    console.log("cyclefrom",this.cycle);
    if(this.cycleId != null){
      this.getCycle(+this.cycleId);
    }

    
    this.cycle = this.sharedService.cycle;
    this.sharedService.cycle = this.cycle;
    console.log("userToken123456",sessionStorage.getItem("userToken"));
    
  }

  ngOnInit(): void {
    if(this.cycleId != null){
      this.cycleService.getFaculties(+this.cycleId).subscribe(
        (val) =>{
          console.log("faculties for cycle "+this.cycleId,val)
          this.faculties = val.result
        }
      )
    }

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
  navigate(){
    this.router?.navigate(["cycle/add-faculty",this.cycleId])
  }
  getLevels(faculty?:Faculty){
    this.sharedService.faculty = faculty;
    console.log("this.sharedService.faculty",this.sharedService.faculty);
    this.router.navigate(['cycle',this.cycle?.id,'faculty',faculty?.id,])

    

  }
  deleteFaculty(id?:number){
    console.log("i am here")
    this.facultyService?.deleteFaculty(id).subscribe(
      (val) =>{
        console.log("delete",val)
        if(this.cycleId != null){
          this.cycleService.getFaculties(+this.cycleId).subscribe(
            (val) =>{
              console.log("faculties for cycle "+this.cycleId,val)
              this.faculties = val.result
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
