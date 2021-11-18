import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AgentService } from '../service/agent.service';
import { RoleService } from '../service/role.service';

export interface PeriodicElement {
  name: string;
  Email: string;
  role:string;
  Action:string
  }
  
  let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['./admin-agent.component.css']
})
export class AdminAgentComponent implements OnInit {
  admin_email:any
  Role_data :any;
  role:any
  dataRefresher:any
  User:any
  Admin_TEmail:any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [ 'name', 'Email','role','Action'];
  dataSource = new MatTableDataSource(Reg);

  

  user$ :Observable<Array<{ Chat: any; } >> | undefined ;

  refresh_User$ = new BehaviorSubject<boolean>(true);

  constructor(
    public roleService:RoleService,
    public agentService : AgentService,
    public router:Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {

    this.admin_email = localStorage.getItem('email')
    this.Admin_TEmail= localStorage.getItem('Admin_T')
    // console.log(this.Admin_TEmail)
    this.roleService.getShowAdminRole().subscribe((data:any)=>{
      this.Role_data =data
      console.log('Get AGnet',data)
    })

    this.User = this.refresh_User$.pipe(switchMap(_ => this.agentService.getAgent()));
 
    this.refreshData(); 

  }
  getData(_setPageFlag: boolean){
    this.agentService.getAgent().subscribe((data:any)=>{
      this.dataSource.data  = data
  
      console.log('Agent',data)
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
  changeClient(val:any){
    // console.log(val.value)
    this.role = val.value

  }
  onSubmit(form:NgForm){
    const data = {
      Agent_Name:form.value.Agent_Name,
      Agent_Email:form.value.Agent_Email,
      role:this.role,
      Admin_Token:this.Admin_TEmail
    }

    const formData = new FormData();
    formData.append('name',form.value.name)
    formData.append('email',form.value.email)
    formData.append('role',this.role)
    formData.append('admin_email',this.admin_email)

    this.agentService.PostAgent(data).subscribe((data)=>{
      console.log(data)
    })

  }
  deleteAgent(e:any){
      this.agentService.deleteAgent(e).subscribe((data:any)=>{
        console.log(data)
      })
      // window.location.reload()
  }
  CreateLink(e:any){
    var data ={
      name :e.name,
      admin_email:this.admin_email,
      id:e._id 
    
    }

     this.agentService.PostLink(data).subscribe((data:any)=>{

     }) 
  }
}
