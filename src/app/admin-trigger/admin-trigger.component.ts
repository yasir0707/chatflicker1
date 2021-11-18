import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TriggerService } from '../service/trigger.service';
import {MatTableDataSource} from '@angular/material/table';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

export interface PeriodicElement {
  name: string;
  description: string;
  Email: string;
  Action:string
  }
  
  let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-admin-trigger',
  templateUrl: './admin-trigger.component.html',
  styleUrls: ['./admin-trigger.component.css']
})
export class AdminTriggerComponent implements OnInit {
  dataRefresher: any;
  User: any;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [ 'name', 'Email', 'description','Action'];
  dataSource = new MatTableDataSource(Reg);


  user$ :Observable<Array<{ Chat: any; } >> | undefined ;

  refresh_User$ = new BehaviorSubject<boolean>(true);

admin_email:any;
admin_token:any;
  constructor(
    public trig_Service:TriggerService,
    public router:Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
     this.admin_email = localStorage.getItem('email')
     this.admin_token = localStorage.getItem('Admin_T')
     
    //  this.trig_Service.getAdminTrigger().subscribe((data:any)=>{
    //   this.dataSource.data = data
    //  })
     this.User = this.refresh_User$.pipe(switchMap(_ => this.trig_Service.getAdminTrigger()));
     console.log("user data",this.User)
 
     this.refreshData(); 
  }
  getData(_setPageFlag: boolean){
    this.trig_Service.getAdminTrigger().subscribe((data:any)=>{
      this.dataSource.data  = data
  
      console.log(data)
      this.dataSource.data = data

    })
  }
  
refreshData(){
  this.dataRefresher =
    setInterval(() => {
      this.getData(false);
      //Passing the false flag would prevent page reset to 1 and hinder user interaction
    }, 1000);  
}


  deleteTrigger(id:any){
    this.trig_Service.DeleteTrigger(id).subscribe((data:any)=>{
      console.log(data)
    })
    // window.location.reload();
  }
  SendTrigger(e:any){
    var data = {
      admin_token:this.admin_token,
      admin_email : e.admin_email,
      adminmsg: e.description
    }
    console.log(data)
    this.trig_Service.postTriggerMsg(data).subscribe((dat:any)=>{
          console.log(dat)
    })
  }
  onSubmit(form:NgForm){
    var data ={
        tr_name: form.value.tr_name,
        tr_description:form.value.tr_description,
        admin_email:this.admin_email,
        admin_token:this.admin_token,
        admin_id:1111

    }
    var formData = new FormData();
    formData.append('tr_name',form.value.tr_name)
    formData.append('tr_description',form.value.tr_description)
    console.log(form.value)
   console.log(formData)

   if(form.value.tr_name != '' && form.value.tr_description != ''){
    this.trig_Service.postTrigger(data).subscribe((data:any)=>{
      console.log(data)
    })
   }
   else{
     console.log('empty data')
   }
  }
}
