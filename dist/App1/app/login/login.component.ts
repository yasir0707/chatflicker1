import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
msg:any;
msg1:any
showMsg:any;
  constructor(public RegServices:RegisterService) { }

onSubmit(form:NgForm){
  if(form.value['Admin_Email'] && form.value['Admin_Password'])
  {
    this.RegServices.LoginUser(form.value).subscribe((data)=>{
      // console.log(data)
      this.msg =data;
      console.log(this.msg);

      if(this.msg.token){
          this.showMsg = "Login Successs"
          console.log('login success')
      localStorage.setItem('email',form.value['Admin_Email'])
      localStorage.setItem('Admin_T',this.msg.token)
      sessionStorage.setItem('Admin_Email',form.value['Admin_Email'])

      window.location.href = "http://localhost:4200/admin"
      }
      else{
        if(this.msg.message == 'Invalid Password Detail'){
           
            this.msg1 = "Incorrect Password"
        }
       else if(this.msg.message == 'Email not found'){
          this.msg1 = "Email not found"
        }
        else{
          this.msg1 = "Login Failed"
        }
          this.showMsg = "Login Failed"
      }
      // console.log(`login ${data} ${form.value}`)
      // console.log(JSON.stringify(form.value))
    })
  }
  else{
    this.msg1 = "Insert Both Email and Password"
  }
}

  ngOnInit(): void {
  }

}
