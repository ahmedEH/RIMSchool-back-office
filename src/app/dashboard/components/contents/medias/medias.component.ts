import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matter } from 'src/app/models/matter';
import { Media } from 'src/app/models/media';
import { MatterService } from 'src/app/services/matter.service';
import { MediaService } from 'src/app/services/media.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddMediaComponent } from '../add-media/add-media.component';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasComponent implements OnInit {

  @Input() matter: number = 0;

  matterI:Matter = new Matter()

  medias:Media[] = []

  matterId:string|null;
  DeleteMedia = PermissionType.DeleteMedia

  mediaService:MediaService

  router:Router

  route:ActivatedRoute

  matterService: MatterService

  url = "/home/ahmed/stage_PFE/schoolroom/src/main/resources/uploads/"
  photos: Media[] = [];




  constructor(private authService:AuthService,mediaService:MediaService,router:Router,route:ActivatedRoute,matterService:MatterService) {

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
        this.photos = val.result.filter(photo => photo.type =='IMAGE')
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
        console.log("media was deleted");
        if(this.matterId != null){
          this.mediaService.getMedias(+this.matterId).subscribe((val) =>{
            this.medias = val.result
            this.photos = val.result.filter(photo => photo.type =='IMAGE')
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
    return this.authService.isAdministrator()
  }

}


