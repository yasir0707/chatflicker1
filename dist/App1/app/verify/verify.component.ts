import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
public DataMsg:any
verify_msg:any
show_verify:any
  constructor(
    private RegService : RegisterService,
    private http :HttpClient
  ) { }
  @Input() VerifyMsg:any; 


  ngOnInit(): void {

    this.DataMsg = this.VerifyMsg;
    // console.log('REGister msg',this.VerifyMsg.value['Admin_Name']);
    // this.RegService.postUser(this.VerifyMsg).subscribe((data:any)=>{
    //   console.log(data)
    // })
  }
  onSubmit(form:NgForm){
// var data ={
//   Admin_Name: form.value['Admin_Name'],
//   Admin_Email: form.value['Admin_Email'],
//   Admin_Company:form.value['Admin_Company'],
//   Admin_Number: form.value['Admin_Number'],
//   Admin_Password:form.value['Admin_Password'],
//   verify_code: form.value['verify_code']

// }
    console.log('REGister msg',this.DataMsg);

        this.RegService.postUser(this.DataMsg,form.value['verify_code']).subscribe((data:any)=>{
      this.verify_msg =data
      if(this.verify_msg.msg  == 'add'){
        window.location.href = "http://localhost:4200/login"
      } 
      else{
        this.show_verify = "Not Verify"
      } 
          console.log(data)

    })
  }
}
