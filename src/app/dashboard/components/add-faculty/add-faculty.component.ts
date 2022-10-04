import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Cycle } from 'src/app/models/cycle';
import { Faculty } from 'src/app/models/faculty';
import { CycleService } from 'src/app/services/cycle.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SharedService } from 'src/app/services/shared.service';
import { Location } from '@angular/common'
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {


  error:any;
  submitted = false;
  faculty:Faculty = new Faculty()
  router:Router;
  facultyService:FacultyService;
  sharedService:SharedService;
  cycle:Cycle | undefined
  cycleService:CycleService
  route:ActivatedRoute
  cycleId:String | null
  title = "Add faculty";
  name = ''
  edit = false;

  constructor(private roure:ActivatedRoute, router:Router,facultyService:FacultyService,sharedService:SharedService,cycleService:CycleService,route:ActivatedRoute,private navigation:NavigationService) { 
    this.facultyService = facultyService;
    this.sharedService = sharedService
    this.route = route;
    this.cycleService = cycleService;
    this.sharedService = sharedService
    this.router = router
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.navigation.history.push(event.urlAfterRedirects)
      }
    })
    console.log("history : ",this.navigation.history);

    this.cycleId = this.route.snapshot.paramMap.get('id');
    console.log("cyclefrom",this.cycle);
    if(this.cycleId != null){
      this.getCycle(+this.cycleId);
    }

    
    this.cycle = this.sharedService.cycle;
    this.sharedService.cycle = this.cycle
    this.router = router;
    this.cycleService = cycleService
    this.cycle = this.sharedService.cycle
  }

  ngOnInit(): void {
    console.log("this.router", this.route.snapshot.routeConfig?.path?.includes('edit'));
    if( this.route.snapshot.routeConfig?.path?.includes('edit')){
      this.edit = true
      this.title = "Modify faculty"
      const facultyId = this.route.snapshot.paramMap.get('faculty');
      console.log("this.cycleId: ",facultyId);
      
      if(facultyId != null){
        this.facultyService.getFaculty(+facultyId).subscribe((val) =>{
          this.faculty = val.result;
          console.log("this.faculty: ",this.faculty);
           this.name = (this.faculty.name != null)? this.faculty.name : '';
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
      this.faculty.name = this.facultyForm.controls['name'].value;
      console.log("faculty",this.faculty)
      console.log("edit : ",this.faculty);
      this.facultyService.editFaculty(this.faculty).subscribe((val) =>{
        console.log("editfaculty()",val)
        this.error = false;
      },
      (error) =>{
        this.error = true;
      })
      
      
    }else{
    this.submitted = true;
    this.faculty.name = this.facultyForm.controls['name'].value;
    this.faculty.created_at = new Date();
    this.faculty.cycle = this.cycle;
    console.log("faculty",this.faculty)

    this.facultyService.addFaculty(this.faculty).subscribe((val) =>{
      console.log("addCycle()",val)
      this.error = false;
    },
    (error) =>{
      this.error = true;
    })
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
  back(){
    this.navigation.back();
  }
  facultyForm= new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
  });

}

/*
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',13);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',13);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',13);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',13);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',13);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',13);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',14);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',14);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',14);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',14);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',14);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',14);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',15);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',15);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',15);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',15);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',15);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',15);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',16);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',16);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',16);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',16);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',16);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',16);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',17);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',17);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',17);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',17);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',17);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',17);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',18);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',18);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',18);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',18);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',18);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',18);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',19);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',19);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',19);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',19);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',19);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',19);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',20);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',20);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',20);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',20);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',20);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',20);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',21);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',21);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',21);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',21);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',21);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',21);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',22);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',22);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',22);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',22);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',22);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',22);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',23);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',23);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',23);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',23);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',23);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',23);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',24);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',24);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',24);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',24);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',24);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',24);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',25);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',25);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',25);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',25);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',25);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',25);

INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Mathematiques',26);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Physiques et chimie',26);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Arabe',26);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Francais',26);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Anglais',26);
INSERT INTO `matter`(`created_at`, `name`, `level`) VALUES (NOW(),'Education Islamique',26);
*/
