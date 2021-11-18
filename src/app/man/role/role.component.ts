import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/service/role.service';

export interface PeriodicElement {
  name: string;
 
  Action:string
  }
  
  let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [ 'name', 'Action'];
  dataSource = new MatTableDataSource(Reg);

  constructor(
    public roleServices : RoleService
  ) { }

  ngOnInit(): void {
    this.roleServices.getRole().subscribe((data:any)=>{
      this.dataSource = data
    })
  }
  onSubmit(form:NgForm){

      const formData = new FormData();
       formData.append('role_name',form.value.role_name) 
      if(form.value.role_name != ''){
          this.roleServices.PostRole(form.value).subscribe((data:any)=>{
              console.log(data)
          })
        }
      }
      DeleteRole(e:any){
        this.roleServices.deleteRole(e).subscribe((Data:any)=>{
          console.log(Data)
        })
        window.location.reload();
      }
}
