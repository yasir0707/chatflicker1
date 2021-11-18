import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  chck:boolean = false
  Email:any
  u_data:any
  Show_msg:any
  u_check:boolean = true
  v_chck:boolean = true
  Show_pass:any
  pass_data:any
  constructor(
    private RegServices:RegisterService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    this.Email = form.value['Admin_Email']
   
     this.RegServices.PostForget(form.value).subscribe((data:any)=>{
         console.log(data)
       }) 
    this.v_chck=false
    this.chck = true
  }
  
  onSubmit1(form:NgForm){
    console.log(form.value['Admin_Code'])
    var data= {
      Admin_Email:this.Email,
      code:form.value['Admin_Code']
    }
      this.RegServices.VerifyEmail(data).subscribe((data:any)=>{
        console.log(data)
        this.u_data =data;
        console.log(this.u_data.msg)
        if(this.u_data.msg == 'ok'){
          // window.location.href = "http://localhost:4200/updatepass"
          this.u_check = false
          this.v_chck = true

        }
        else{
          this.Show_msg = "Incorrect code"
          console.log('error',this.Show_msg)
        }
      })
  }
  onSubmit3(form:NgForm){
    if(form.value['Admin_Password'] == form.value['Admin_CPassword']){
      var data = {
        Admin_Email : this.Email,
        Admin_Password:form.value['pass'] 
        
      }
      this.RegServices.Update_Pass(data).subscribe((dt:any)=>{
        console.log(dt)
        this.pass_data = dt
        if(this.pass_data.message == 'Admin Password Update'){
          window.location.href = "http://localhost:4200/login"
        }
        else{
          this.Show_pass = "Not Updated"
        }
      })
    }
    else{
      this.Show_pass = "Password not Matched"
    }
   
    
  }
}
