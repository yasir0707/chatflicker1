import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RoleService } from '../service/role.service';


export interface PeriodicElement {
  name: string;
  
  Action:string
  }
  
  let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-admin-role',
  templateUrl: './admin-role.component.html',
  styleUrls: ['./admin-role.component.css']
})
export class AdminRoleComponent implements OnInit {
  admin_email:any
  admin_token:any;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [ 'name', 'Action'];
  dataSource = new MatTableDataSource(Reg);
  dataSource1 = new MatTableDataSource(Reg);
  get_Data :any

  dataRefresher:any
  User:any
  user$ :Observable<Array<{ Chat: any; } >> | undefined ;

  refresh_User$ = new BehaviorSubject<boolean>(true);


  constructor(
    public roleServices : RoleService,
    public router:Router
  ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

  }

  ngOnInit(): void {
    this.admin_email =    localStorage.getItem('email');
    
    this.admin_token = localStorage.getItem('Admin_T')
    this.roleServices.getRole().subscribe((data:any)=>{
      this.dataSource = data
    })
    this.User = this.refresh_User$.pipe(switchMap(_ => this.roleServices.getAdminRole()));
 
    this.refreshData(); 
  }
  getData(_setPageFlag: boolean){
    this.roleServices.getAdminRole().subscribe((data:any)=>{
      this.dataSource1.data  = data
  
      // console.log(data)
      this.dataSource1.data = data

    })
  }
  
refreshData(){
  this.dataRefresher =
    setInterval(() => {
      this.getData(false);
      //Passing the false flag would prevent page reset to 1 and hinder user interaction
    }, 1000);  
}

  onSubmit(form:NgForm){
    var data = {
      admin_token:this.admin_token,
      role_name:form.value.role_name,
      admin_email:this.admin_email
    }
    const formData = new FormData();
     formData.append('role_name',form.value.role_name) 
    if(form.value.role_name != ''){
        this.roleServices.PostAdminRole(data).subscribe((data:any)=>{
            console.log(data)
        })
      }
    }
    DeleteRole(e:any){
      this.roleServices.deleteAdminRole(e).subscribe((Data:any)=>{
        console.log(Data)
      })
      window.location.reload();
    }
}
