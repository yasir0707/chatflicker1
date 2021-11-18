import { AfterViewChecked, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ChatService } from '../service/chat.service';
import { RegisterService } from '../service/register.service';
 import * as $ from 'jquery'
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {saveAs} from 'file-saver';
import { FileSelectDirective,FileUploader } from 'ng2-file-upload';
import { NONE_TYPE } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-admin-show',
  templateUrl: './admin-show.component.html',
  styleUrls: ['./admin-show.component.css']
})
export class AdminShowComponent implements OnInit,AfterViewChecked {
  shw_img:any
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
   saveChat:any;
   username:any;
  image_name:any
  multiple_img:any;
   emp_msg:any ="" 
Reg:any =[]
UpdateId:any;
showImg:any;
display:any = "none";
declare $:any;
closeResult = '';
downImg:any;
Admin_TK: any;
i:any;
usr_notify:any=0;
admin_msg_st:any;
dataRefresher: any;
User: any;

StoreUserData:any

user$ :Observable<Array<{ Chat: any; } >> | undefined ;

  refresh_User$ = new BehaviorSubject<boolean>(true);



 headers = new HttpHeaders();
  constructor(
    public modalService:NgbModal,
    public RegServices :RegisterService,
    public ChatServices:ChatService,
    public dialog:MatDialog,
    public http:HttpClient,
    public router:Router
    ) { 
      
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }
    // openDialog() {
    //   this.dialog.open(dialogBox);
      
    // }
 
    openVerticallyCentered(content:any) {
      this.modalService.open(content, { centered: true });
    }

    chat_status(){
    
    }
// Image Select

  selectImage(event:any){
    if(event.target.files.length > 0){
        const file  = event.target.files[0];
        this.image_name = file;
        // console.log(file);
    }
  }

download(e:any){
  // console.log('download ',e)
  // let headers= new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', type: 'image/jpeg', responseType : 'image/jpeg'});
  // const httpOptions = {
  //   headers: headers
  // };
  const formData = new FormData();
  formData.append('img',e)
    this.http.post<any>('http://localhost:3000/chat/read/'+e,formData).subscribe((res:any) => {
    this.downImg = res
    this.showImg = this.downImg.path

    console.log(this.showImg)   
    //  this.downImg = res
  // window.location.href = this.downImg.img;
  window.open(this.showImg,'_blank')
  // saveAs(this.downImg.img)
        // console.log(this.downImg.img)
      }
      )
}
 // Chat Submit
    onSubmit(form:NgForm){

      // console.log("admin msg status"+this.admin_msg_st)
      this.saveChat ={
        adminmsg :  form.value.adminmsg,
        file:this.image_name,
        id: this.user_id,
        admin_token:this.Admin_TK,
        admin_msg_status:this.admin_msg_st = this.admin_msg_st+1,
       adminemail :this.str,
      //  usermsg:this.user_text,
       useremail:this.user_email
      }
        form.value.userid= this.user_id
        // console.log(this.saveChat)
        if(form.value['adminmsg']){
          form.value['adminmsg'] = null
        this.ChatServices.PostUser(this.saveChat).subscribe((data:any)=>{
            // console.log(data)
          
        },  (err)=>{console.log(err)})
      }
      form.reset()
      
        // console.log(this.saveChat)
        // console.log(JSON.stringify(form.value))
       
      }
      selectMultiple(event:any){
        if(event.target.files.length > 0){
          this.multiple_img = event.target.files;
          // console.log(this.multiple_img)
        }
      }
      onSubmit1(form:NgForm){
        this.ngOnInit()
        const formData = new FormData();
        if(this.multiple_img){
          // console.log(this.multiple_img,'Multiple img')
          for(let img of this.multiple_img){
            formData.append('admin_files',img);
          }
          formData.append('admin_token',this.Admin_TK)
          formData.append('adminmsg',form.value.adminmsg1)
          formData.append('id',this.user_id)
          formData.append('useremail',this.user_email)
          // formData.append('usermsg',this.user_text)
          formData.append('adminemail',this.str)
          this.http.post<any>('http://localhost:3000/chat/multiple',formData).subscribe((res)=>{
            // console.log('multiple',res)
          })
          form.reset()
        }
        else{
          
          formData.append('admin_token',this.Admin_TK)
        formData.append('file',this.image_name);
        formData.append('adminmsg',form.value.adminmsg)
        formData.append('userid',this.user_id)
        formData.append('useremail',this.user_email)
        // formData.append('usermsg',this.user_text)
        formData.append('adminemail',this.str)
        this.http.post<any>('http://localhost:3000/chat/',formData).subscribe((res)=>{
          // console.log(res)
        })
        form.reset()
      }
        // console.log(form.value.imgName)
        // this.saveChat ={
        //   adminmsg :  form.value.adminmsg,
        //   file:this.image_name,
        //   userid: this.user_id,
        //  adminemail :this.str,
        // //  usermsg:this.user_text,
        //  useremail:this.user_email
        // }
        //   form.value.userid= this.user_id
        //   console.log(this.saveChat)
        //   if(form.value.adminmsg){
        //     form.value.adminmsg = ""
        //   this.ChatServices.PostUser(this.saveChat).subscribe((data:any)=>{
        //       console.log(data)
            
        //   },  (err)=>{console.log(err)})
        // }
        
          // console.log(this.saveChat)
          // console.log(JSON.stringify(form.value))
          // this.getChat()
        }
     
  ngOnInit(): void {
 
    this.str =    localStorage.getItem('email')
    this.Admin_TK = localStorage.getItem('Admin_T');
    console.log(this.Admin_TK)
    setTimeout(() =>{
      this.ngOnInit()
      },1000);
        this.getChatData()
       this.chat(this.StoreUserData);
  }
getChatData(){
  this.ChatServices.getAdminChat().subscribe((data:any)=>{
    this.Reg = data;
    console.log(data)
        })
}
  ngAfterViewChecked():void{
    // this.ngOnInit()
  }




  update(e:any,id:any){
    this.UpdateId = id
  }

  Delete(id:any){
    this.ChatServices.DeleteChat(id).subscribe((data)=>{
      
    })
    // window.location.reload()
  }
  chat(e:any){
    console.log(e)
    this.StoreUserData =e;
    this.user_email =e.useremail
    this.user_text = e.usermsg;
    this.user_id = e._id
    this.userid = e._id;
    this.username = e.username;
    this.adminemail = this.str
    
    // this.admin_chat =false
    this.admin_msg_st = e.admin_msg_status
    var data = this.Reg.filter((x: { useremail: any; }) => x.useremail == this.user_email)
    console.log('data',data)
    this.user_msg1 =data[0].msg
    var usr_status = data.filter((x :{user_msg_status:any})=>x.user_msg_status = "0")
      // User Status
    // console.log(this.user_id)
    const formData = new FormData();
formData.append("id",this.user_id)
      this.ChatServices.PostUserStatus(formData,this.user_id).subscribe((data:any)=>{
          // console.log(data)
      })
     
    this.usr_notify = 0
    for(this.i=0;this.i<=data.length;this.i++){
        if(data[0].user_msg_status == 0){
          this.usr_notify += 1;
          // console.log(this.usr_notify)
        }

      //  console.log('data',data[0].user_msg_status)
    }   
  }
}



const uri = 'http://localhost:3000/chat/'
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialogBox.html',
  providers :[MatButtonModule]
})
export class dialogBox{
  str:any;
  adminemail:any;
  userid:any;
  uploader:FileUploader = new FileUploader({url:uri})    
  attachList :any =[]
  public user_id:any ;
  public user_email:any;
 
  multiple_img:any;
  Admin_TK: any;
  constructor(
    public http:HttpClient
  ){
    this.uploader.onCompleteItem = (item:any,response:any,status:any,headers:any)=>{
      this.attachList.push(JSON.parse(response))
      // console.log('Attach file',JSON.parse(response))
    }

      }
      selectMultiple(event:any){
        if(event.target.files.length > 0){
          this.multiple_img = event.target.files;
          // console.log(this.multiple_img)
        }
      }
       // Chat Submit
    onSubmit(form:NgForm){
      const formData = new FormData();
      for(let img of this.multiple_img){
        formData.append('files',img);
      }

     
      
      formData.append('admin_token',this.Admin_TK)
      formData.append('adminmsg',form.value.adminmsg)
      formData.append('userid',this.user_id)
      formData.append('useremail',this.user_email)
      // formData.append('usermsg',this.user_text)
      formData.append('adminemail',this.str)
      this.http.post<any>('http://localhost:3000/chat/multiple',formData).subscribe((res)=>{
        // console.log('multiple',res)
      })
      }
}
