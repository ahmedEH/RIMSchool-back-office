import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Cycle } from 'src/app/models/cycle';
import { AuthService } from 'src/app/services/auth.service';
import { CycleService } from 'src/app/services/cycle.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cycles',
  templateUrl: './cycles.component.html',
  styleUrls: ['./cycles.component.scss']
})
export class CyclesComponent implements OnInit {
  router:Router;
  cycleService:CycleService;
  authService:AuthService;
  cycles:Cycle[] = [];
  sharedService:SharedService;
  AddCycle = PermissionType.AddCycle;
  SeeFaculties = PermissionType.SeeFaculties;
  DeleteCycle = PermissionType.DeleteCycle;
  UpdateCycle = PermissionType.UpdateCycle

  constructor(userService:UserService,authService:AuthService,router:Router,cycleService:CycleService,sharedService:SharedService,private navigation:NavigationService) { 
    this.authService = authService;
    this.router = router;
    this.cycleService = cycleService;
    this.sharedService = sharedService
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navigation.history.push(event.urlAfterRedirects)
      }
    })
    console.log("history : ",this.navigation.history);
  }

  ngOnInit(): void {
    this.cycleService.getAllCycles().subscribe(
      (val) =>{
        this.cycles = val.result;
        console.log("cycles : ",val.result)
      }
    )
    console.log("cycles : ",this.cycles)
    
  }
  getFaculties(cycle?:Cycle){
    this.sharedService.cycle = cycle;
    console.log("this.sharedService.cycle",this.sharedService.cycle);
    this.router.navigate(['cycles',cycle?.id])

    

  }
  deleteCycle(id?:number){
    console.log("i am here")
    this.cycleService?.deleteCycle(id).subscribe(
      (val) =>{
        console.log("delete",val)
        this.cycleService.getAllCycles().subscribe(
          (val) =>{
            this.cycles = val.result;
            console.log("cycles : ",val.result)
          }
        )
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
    return this.authService.isAdministrator();
  }

}
