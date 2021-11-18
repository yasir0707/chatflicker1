import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Register } from '../model/register.model';
import { RegisterService } from '../service/register.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
ngForm:any;
Reg:any=[];
UpdateId:string=""
modal:Register=<Register>{};
editMode:boolean = false
RegMsg:any
toggleButton:boolean = true;
isEditable:boolean = false
reg_box:boolean = false
Reg_Show:any
Reg_data:any
load:boolean = true
  constructor(
    public RegServices :RegisterService,

 
  ) { }

  onSubmit(form:NgForm){
      //   this.RegServices.postUser(form.value).subscribe(
      //   (data:any)=>{console.log('Add data',data)
   
      // },
      //   (err)=>{console.log(err)}
      // )
      this.load =false
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    console.log(JSON.stringify(form.value))
    if(form.value['Admin_Name'] && form.value['Admin_Email'] && form.value['Admin_Company'] && form.value['Admin_Number'] &&
    form.value['Admin_Password'] && form.value['Admin_CPassword']){
      if(re.test(form.value['Admin_Email'])){

      
      if(form.value['Admin_Password'] == form.value['Admin_CPassword']){
         
    this.RegMsg = form.value
           this.RegServices.postEmail(form.value).subscribe((data:any)=>{
            this.Reg_data =data
         
            if(this.Reg_data.msg == 'already'){
              this.Reg_Show = "Already exit"
              this.load = true
            }
            else if(this.Reg_data.msg == 'ok'){
               this.reg_box = true
        this.isEditable = true  
            }
            else{
              this.Reg_Show = "Something wrong"
              this.load = true
            }
       
    
      },
        (err)=>{console.log(err)}
    )
      }
      else{
        this.load = true
        this.Reg_Show = "password not matched"
      }
    }
      else{
        this.load = true
        this.Reg_Show = "Incorrect email"
      }
      
    }
    else{
      this.load = true
      this.Reg_Show = "Insert All Field"
    }
  
   
    
  }
  ngOnInit(): void {
    this.RegServices.getUser().subscribe((data:any)=>{
      this.Reg = data;

    })
    
  }
  @ViewChild('Admin_Name')a_name:any;
  @ViewChild('Admin_Email')a_email:any;
  @ViewChild('Admin_Company')a_comp:any;
  @ViewChild('Admin_Number')a_numb:any;
  @ViewChild('Admin_Password')a_pass:any;
  update(e:any,id:any){
    this.UpdateId = id
    this.editMode =true
  }

  Delete(id:any){
    this.RegServices.DeleteUser(id).subscribe((data)=>{
      
    })
    window.location.reload()
  }

}
