import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/service/register.service';
import {MatTableDataSource} from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  Email: string;
  Company: string;
  Action:string
}

let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-show-admin',
  templateUrl: './show-admin.component.html',
  styleUrls: ['./show-admin.component.css']
})
export class ShowAdminComponent implements OnInit {

  

  
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(
    public RegService:RegisterService
  ) { }

  ngOnInit(): void {
    

    this.RegService.getUser().subscribe((data:any)=>{
        Reg =data
        console.log(Reg)
        this.dataSource.data = data
        console.log(this.dataSource.data)
       
    })
  }
  Delete(e:any){
      this.RegService.DeleteUser(e).subscribe((data:any)=>{
          console.log(data)
          
      })
      window.location.reload();
  }
  displayedColumns: string[] = ['position', 'name', 'Email', 'Company','Action'];
  dataSource = new MatTableDataSource(Reg);
}
