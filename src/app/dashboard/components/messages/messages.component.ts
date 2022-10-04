import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PermissionType } from 'src/app/enumerations/permissionType';
import { Message } from 'src/app/models/message';
import { Note } from 'src/app/models/note';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit,AfterViewChecked {
  @ViewChild('messageBody') private myScrollContainer: ElementRef;

  messages:Message[] = [];
  DeleteMessage = PermissionType.DeleteMessage
  message:Message = new Message();
  SeeMessages = PermissionType.SeeMessages
  SendMessage = PermissionType.SendMessage

  messageForm= new FormGroup({
    text: new FormControl('',[Validators.required,Validators.minLength(2)]),
  });

  constructor(private authService:AuthService,private messagesService:MessagesService) { 
    this.scrollToBottom();  
    
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight - this.myScrollContainer.nativeElement.clientHeight;
    } catch(err) { }                 
}
  ngOnInit(): void {
    this.messagesService.getAllMessages().subscribe((res)=>{
      this.messages = res.result;


    })


  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();  
  }
  onSubmit(){

    console.log("onSubmit() message");
    
    console.log("message.user :",this.authService.userO);
    this.message.created_at =new Date();
    this.message.text =this.messageForm.controls['text'].value;
    this.message.user = this.authService.userO;
    console.log("this.authService.userO",this.authService.userO);
    
    
 

    this.messagesService.addMessage(this.message).subscribe((rs) => {
      console.log(rs);
      this.messagesService.getAllMessages().subscribe((val)=>{
        this.messages = val.result;
        console.log(this.messages);
        this.scrollToBottom();
        
        // this.messages = [...this.messages].reverse();
        // console.log(this.messages);
        

      })
      
    },
    (e)=>{
      console.log(e);
      
    })
  }
  isPermitted(p:PermissionType){
    return this.authService.isPermitted(p);
  }
  isAdministrator(){
    return this.authService.isAdministrator();
  }
  deleteMessage(id?:number){
    this.messagesService.deleteMessage(id).subscribe((val)=>{
      this.ngOnInit()
    },
    (e)=>{
      console.log(e);
      
    })
  }

}
