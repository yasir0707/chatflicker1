import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin-visitor',
  templateUrl: './admin-visitor.component.html',
  styleUrls: ['./admin-visitor.component.css']
})
export class AdminVisitorComponent implements OnInit {
  address_data:any;
  constructor(
    public UserService:UserService
  ) { }

  ngOnInit(): void {
    const adminemail = localStorage.getItem('email')
    this.UserService.getAddress(adminemail).subscribe((data)=>{
      this.address_data = data
      console.log(data)
    })
  }


}
