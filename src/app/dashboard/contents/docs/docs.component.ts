import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Matter } from 'src/app/models/matter';
import { Media } from 'src/app/models/media';
import { AuthService } from 'src/app/services/auth.service';
import { MatterService } from 'src/app/services/matter.service';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent implements OnInit {

  @Input() matter: number = 0;

  matterI:Matter = new Matter()

  medias:Media[] = []

  matterId:string|null;

  mediaService:MediaService

  router:Router

  route:ActivatedRoute

  matterService: MatterService

  DeleteMedia = PermissionType.DeleteMedia

  url = "/home/ahmed/stage_PFE/schoolroom/src/main/resources/uploads/"
  docs: Media[] = [];




  constructor(private authService: AuthService ,mediaService:MediaService,router:Router,route:ActivatedRoute,matterService:MatterService) {

    this.isPDF("ahmed.pdf")

    // window.location.reload();
    this.mediaService = mediaService;

    this.router = router;

    this.route = route

    this.matterService = matterService

    this.matterId = this.route.snapshot.paramMap.get('matter');
    console.log("matterId",this.matterId);
    if(this.matterId != null){
      this.getMatter(+this.matterId);
    }
    console.log("matterI",this.matterI);

    if(this.matterId != null){
      this.mediaService.getMedias(+this.matterId).subscribe((val) =>{
        this.medias = val.result
        this.docs = val.result.filter(doc => doc.type == 'DOCUMENT')
        console.log("mediasContents",this.medias)
        console.log("HAPPY")
      })
    }

    
   }

  ngOnInit(): void {
  }

  getMatter(id?:number){
    this.matterService.getMatter(id).subscribe(
      (val) =>{
        console.log("getMatter",val);

          this.matterI = val.result

        
      }
    )
  }

  isPDF(pdfname:string | undefined){
    const regExp:RegExp = new RegExp(/.pdf/);
    if(pdfname != undefined){

      console.log("regExp",regExp.test(pdfname))
      console.log("regExp",pdfname)
      return regExp.test(pdfname)

    }else{
      return false
    }


  }

  deleteMedia(id?:number){
    console.log("i am here")
    this.mediaService?.deleteMedia(id).subscribe(
      (val) =>{
        console.log("delete",val)
        if(this.matterId != null){
          this.mediaService.getMedias(+this.matterId).subscribe((val) =>{
            this.medias = val.result
            this.docs = val.result.filter(doc => doc.type == 'DOCUMENT')
            console.log("mediasContents",this.medias)
            console.log("HAPPY")
          })
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
    return this.authService.isPermitted(p)
  }

  isAdministrator(){
    return this.authService.isAdministrator();
  }
  
}
