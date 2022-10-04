import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cycle } from 'src/app/models/cycle';
import { CycleService } from 'src/app/services/cycle.service';
import { Location } from '@angular/common'
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-cycle',
  templateUrl: './add-cycle.component.html',
  styleUrls: ['./add-cycle.component.scss']
})
export class AddCycleComponent implements OnInit {

  error:any;
  submitted = false;
  cycle:Cycle = new Cycle()
  router:Router;
  cycleService:CycleService;
  title = "Add cycle";
  name = ''
  edit = false;

  constructor( private route:ActivatedRoute, router:Router,cycleService:CycleService,private navigation:NavigationService) { 
    this.cycleService = cycleService;
    this.router = router;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navigation.history.push(event.urlAfterRedirects)
      }
    })
    console.log("history : ",this.navigation.history);
  }

  ngOnInit(): void {
    console.log("this.router", this.route.snapshot.routeConfig?.path?.includes('edit'));
    if( this.route.snapshot.routeConfig?.path?.includes('edit')){
      this.edit = true
      this.title = "Modify cycle"
      const cycleId = this.route.snapshot.paramMap.get('cycle');
      console.log("this.cycleId: ",cycleId);
      
      if(cycleId != null){
        this.cycleService.getCycle(+cycleId).subscribe((val) =>{
          this.cycle = val.result;
          console.log("this.cycle: ",this.cycle);
           this.name = (this.cycle.name != null)? this.cycle.name : '';
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
      this.cycle.name = this.cycleForm.controls['name'].value;
      console.log("cycle",this.cycle)
      console.log("edit : ",this.cycle);
      this.cycleService.editCycle(this.cycle).subscribe((val) =>{
        console.log("editCycle()",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })
      
      
    }else{
    this.submitted = true;
    this.cycle.name = this.cycleForm.controls['name'].value;
    this.cycle.created_at = new Date();
    console.log("cycle",this.cycle)

    this.cycleService.addCycle(this.cycle).subscribe((val) =>{
      console.log("addCycle()",val)
      this.error = false;
    },
    (error) =>{
      this.error = true;
    })
    }

    
  }
  back(){
    this.navigation.back()
  }


  cycleForm= new FormGroup({
    name: new FormControl(this.name,[Validators.required,Validators.minLength(5)]),
  });


}
