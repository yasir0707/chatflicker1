import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Chat } from 'src/app/model/chat.model';
import { ChatService } from 'src/app/service/chat.service';
import { MapService } from 'src/app/service/map.service';
import { UserService } from 'src/app/service/user.service';
import { getAllJSDocTags } from 'typescript';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  ip:any;
  ipaddress:string = '';
  latitude:string= '';
  longitude:string= '';
  currency:string = '';
  currencysymbol:string = '';
  isp:string= '';
  city:string = '';
  country:string ='';
  province:string='';
  multiple_img:any;
locData:any;
iP_data:any
map_data:any;
user_msg1:any;
emp_msg = "";
admin_show_email = "";
admin_status:any;
usr_msg_status:any;
admin_id:any;
data_id:any;
  public lat:any;
  public lng:any;
  refresh_User$ = new BehaviorSubject<boolean>(true);

  cht_shw:boolean = false;
  cht_box:boolean = true;
  adminemail:any ;
  public u_email:any;
  public formData:any
  public formData1:any
  dataChat:any=[] ;
  check_user :boolean =false;
  image_name:any;

  check_user1:boolean =true;
  isUser:any;
  mapsAPILoader: any;
  currentLocation: any;
  zoom: any;
  Admin_Token:any;

  constructor(
    public UserServices:UserService,
    public ChatServices:ChatService,
    private visitorsService:MapService,
    public modalService:NgbModal,
    public http:HttpClient,
    private route:ActivatedRoute
  ) { 

    this.ChatServices.isUser.subscribe(value =>{
        this.isUser = value;
        this.getData()
    })
  }
  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }
  ngOnInit(): void {
  this.route.params.subscribe((data:any)=>{
    // console.log(data)
    this.Admin_Token  = data  
  })
  console.log(this.Admin_Token['token'])

    setTimeout(() =>{
      this.ngOnInit()
      },500);
   
    this.getData()

  this.adminemail = localStorage.getItem('email')
  // console.log(this.adminemail)
  this.u_email = localStorage.getItem('useremail')

  // console.log(`User Email`+this.u_email)
    if(this.u_email){
        this.check_user = true
        this.check_user1  = false
    }
    else{
      this.check_user =false
      this.check_user1 =true
    }
  }

  private getData(){
    this.ChatServices.getUserChat().subscribe((data:any)=>{
        this.dataChat = data
        // console.log(data);
        this.user_msg1 =data.msg
        //  console.log(data.msg) 
        this.admin_status = data.admin_msg_status
        
        this.usr_msg_status =data.user_msg_status;
        // console.log(this.usr_msg_status)
        // console.log(data._id)
        this.data_id = data._id
       
        this.admin_show_email= data.adminemail;
        // console.log(this.admin_show_email)
        // console.log('Admin Email '+this.dataChat[1].adminemail)
        
        
     
      })
  }
  // minimize(){
  //   this.check_user1 = true
  //   this.cht_shw = false
  // }


// Status


  chat_status(){
    // console.log('id'+this.data_id)
    const formData = new FormData();
formData.append("id",this.data_id)
      this.ChatServices.PostStatus(formData,this.data_id).subscribe((data:any)=>{
          // console.log('id..'+data)
      })
     
  }
  selectMultiple(event:any){
    if(event.target.files.length > 0){
      this.multiple_img = event.target.files;
      // console.log(this.multiple_img)
    }
  }
  onSubmit2(form1:NgForm){
    
    const formData = new FormData();
    if(this.multiple_img){
      // console.log(this.multiple_img,'Multiple img')
      for(let img of this.multiple_img){
        formData.append('admin_files',img);
      
      }
      //  id:this.data_id ,
      formData.append('id',this.data_id);
      formData.append('admin_token',this.Admin_Token['token'])
      formData.append('adminemail',this.adminemail);
      formData.append('useremail',this.u_email);
      formData.append('usermsg',form1.value.usermsg)
      formData.append('user_msg_status', this.usr_msg_status = this.usr_msg_status+1)
      this.http.post<any>('http://localhost:1111/chat/Usermultiple',formData).subscribe((res)=>{
        // console.log('multiple',res)
    
      })
      form1.reset()
    }
    else{
      formData.append('file',this.image_name);
      
      formData.append('admin_token',this.Admin_Token['token'])
      formData.append('adminemail',this.adminemail);
      formData.append('useremail',this.u_email);
      formData.append('usermsg',form1.value.usermsg)
      this.http.post<any>('http://localhost:1111/chat/',formData).subscribe((res)=>{
        // console.log('multiple',res)
      })
    }


    // this.ChatServices.isUser.next(true)
    // this.formData1 = {
    //   adminemail:this.adminemail,
    //   useremail:this.u_email,
    //   usermsg:form1.value.usermsg

    // }
    // this.ChatServices.PostUser(this.formData1).subscribe((data)=>{
      
    //   console.log('Add data',data)
      
    // })
      // this.getData()
  }
  onSubmit1(form1:NgForm){
this.ChatServices.isUser.next(true)
    this.formData1 = {
      admin_token:this.Admin_Token['token'],
      id:this.data_id ,
      adminemail:this.adminemail,
      useremail:this.u_email,
      usermsg:form1.value.usermsg,
      user_msg_status:this.usr_msg_status = this.usr_msg_status+1


    }
    this.ChatServices.PostUser(this.formData1).subscribe((data)=>{
      
      // console.log('Add data',data)
      
    })
      this.getData()
      form1.reset()
  }
  onSubmit(form:NgForm){
    localStorage.setItem('useremail',form.value['useremail']);
      this.formData = {
        
      admin_token:this.Admin_Token['token'],
        adminemail:this.adminemail,
        useremail:form.value.useremail,
        usermsg:form.value.usermsg,
        username:form.value.username

      }
      window.location.reload()
      this.UserServices.PostUser(form.value,this.adminemail).subscribe((data)=>{
        // console.log("Add user Data")
      })
      this.ChatServices.PostUser(this.formData).subscribe((data)=>{
        // console.log('Add data',data),
        localStorage.setItem('useremail',form.value['useremail']);

        // console.log("local storage user")
        // console.log(JSON.stringify(form.value))
      })
      this.locData ={
        
        admin_email:localStorage.getItem('email'),
        user_email : localStorage.getItem('useremail'),
        user_ip:this.iP_data,
        user_lat:this.lat,
        user_lng:this.lng,
        user_city:this.city,
        user_state:this.province,
        user_country:this.country


      }
      this.UserServices.postAddress(this.locData).subscribe((data)=>{
        // console.log('Add Address')
      })
      form.reset()
  }

  getLocation() {
  
    
  }

}
   


// AIzaSyCuaFgy3oAKdz2OTUHYEYs8pjBw3NIUP9Y