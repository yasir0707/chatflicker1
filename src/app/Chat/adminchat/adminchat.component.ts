import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import {MatChipsModule} from '@angular/material/chips';
import { UserService } from 'src/app/service/user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-adminchat',
  templateUrl: './adminchat.component.html',
  styleUrls: ['./adminchat.component.css']
})
export class AdminchatComponent implements OnInit {
  admin_chat:boolean =true
public user_id:any ;
public user_email:any;
user_text:any;
 user_msg:any; 
 user_msg1:any;
 public dt:any;
 str:any;
 adminemail:any;
 userid:any;
 public data_chat:any;
 saveChat:any;
 emp_msg:any  =""

 scrl_class :any;
  constructor(
    public chatService:ChatService,
    public UserService:UserService
  ) { 
    this.getChat()
  }


  onSubmit(form:NgForm){
    this.saveChat ={
      adminmsg :  form.value.adminmsg,
      userid: this.user_id,
     adminemail :this.str,
    //  usermsg:this.user_text,
     useremail:this.user_email
    }
      form.value.userid= this.user_id
      if(form.value.adminmsg){
      this.chatService.PostUser(this.saveChat).subscribe((data)=>{
          console.log(data)
        
      },  (err)=>{console.log(err)})
    }
      // console.log(this.saveChat)
      // console.log(JSON.stringify(form.value))
      // this.getChat()
    }
  ngOnInit(): void {
    
 this.scrl_class.scrollTop = this.scrl_class.scrollHeight - this.scrl_class.clientHeight;
    this.str = localStorage.getItem('email')
  
    setTimeout(() =>{
      this.ngOnInit()
      },500);
      
      this.getChat()
   
  }
  getChat(){
    this.chatService.getChat().subscribe((data)=>{
      this.user_msg = data
      this.data_chat = data;
      // console.log(this.user_msg)

    })
  }

  deleteChat(id:any){
      this.chatService.DeleteChat(id).subscribe((data)=>{
        
      })
      this.getChat()
    }
  chat(e:any){
    this.user_email =e.useremail
    this.user_text = e.usermsg;
    this.user_id = e._id
    this.userid = e._id;
    this.adminemail = this.str
    console.log(e._id)
    this.admin_chat =false
  }
}
