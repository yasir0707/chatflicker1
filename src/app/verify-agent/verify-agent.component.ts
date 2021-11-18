import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgentService } from '../service/agent.service';

@Component({
  selector: 'app-verify-agent',
  templateUrl: './verify-agent.component.html',
  styleUrls: ['./verify-agent.component.css']
})
export class VerifyAgentComponent implements OnInit {
private tk:any
Show_pass:any
pass_data:any
  constructor(private route: ActivatedRoute,
      private Agent_Service:AgentService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:any)=>{
      this.tk = data
    })
    // this.tk = this.route.snapshot.paramMap.get('token')
    console.log(this.tk['token'])
  }
onSubmit(form:NgForm){
  if(form.value['Admin_Password'] == form.value['Admin_CPassword']){
    var data = {
      Agent_Pass:form.value['pass'], 
      token:this.tk['token']
    }
    this.Agent_Service.AgentPass(data).subscribe((dt:any)=>{
      this.pass_data = dt
      console.log(dt)
      if(this.pass_data.message == 'Agent save'){
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
