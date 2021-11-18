import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../service/register.service';
import {map} from 'rxjs/operators'
import {MatTreeModule} from '@angular/material/tree';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  str:any;
  showFiller = false;
Reg:any =[]
login_check:any ;
onData:any =[];
loginData:any = [];
checkStatus:any;
Session_AdminEmail :any;
i:any;
status:any ;
signal:any
dsplay:boolean = false
dsplay_r:boolean  =false
hm_row:any ;
Admin_Token:any;
public q:any;
usr_type:any;
agnt_shw:boolean = false;
  constructor(
    public http:HttpClient,
    public RegServices:RegisterService
  ) { 
    

  }
  display(){
    this.dsplay = !this.dsplay

  }
online(){
  this.onData = {
    Admin_Email:this.str,
    status:1
  }
  this.http.post<any>('http://localhost:1111/register/login/status',this.onData).subscribe((res)=>{
     
  })
  this.signal =true
}
offline(){
  this.onData = {
    Admin_Email:this.str,
    status:0
  }
  this.http.post<any>('http://localhost:1111/register/login/status',this.onData).subscribe((res)=>{
      
  })
  this.signal =false
}

  ngOnInit(): void {
    
    this.Session_AdminEmail = sessionStorage.getItem('Admin_Email')
    
   this.str =  localStorage.getItem('email')
    this.Admin_Token = localStorage.getItem('Admin_T')
   this.RegServices.getUser().subscribe((data:any)=>{
      this.Reg = data;
    
      console.log(`login data check ${this.Reg[2].Admin_Email}`)


    if(this.loginData['status'] == 1)
    {
      this.checkStatus = "online"
    }
    else{
      
      this.checkStatus = "offline"  
    }
      if(this.str){
        this.login_check = this.str
      }
      else{
        this.login_check = "Login"
      }

      this.RegServices.getLogin(this.Admin_Token).subscribe((data:any)=>{
        console.log('logindata',data)
        this.usr_type = data
        if(this.usr_type.msg == 3){
          this.agnt_shw = true
        }
        else{

        }
      })
      setTimeout(()=>{
        // this.ngOnInit()
        this.GetStatus()
      },1000)
    })
    this.GetStatus()
    
  }
  GetStatus(){
    this.RegServices.GetStatus(this.str).subscribe((res:any)=>{
      this.loginData = res

      console.log('Admin email',this.str)
      //  var cl1 = res.map((q: { status: any; }) => q.status)
      //  console.log(cl1)
      
      //  console.log('Status',this.loginData['status'])
      if(this.loginData['status'] ==1){
        this.checkStatus = "online"
        this.signal =true
      }else{
        this.checkStatus = "offline"
        this.signal = false
      }

        // for(this.i=0;this.i<=res.length;this.i++){
        //   if(this.loginData[this.i]['Admin_Email'] == this.str){
        //     console.log(this.loginData[this.i]['status'])
        //     if(this.loginData[this.i]['status'] == 1){
        //         this.checkStatus = "online"
        //         console.log("online")
        //     }
        //     if(this.loginData[this.i]['status'] == 0){
        //         this.checkStatus = "offline"
        //         console.log("offline")
        //       }
        //   }
            

        // }
    })
  }

  logout(){
    localStorage.removeItem('email')
    window.location.href = "http://localhost:4200/login"
  }
}
