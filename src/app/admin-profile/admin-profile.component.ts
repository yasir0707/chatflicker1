import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  Email:any
  ProfileData:any
  constructor(
    private RegService:RegisterService
  ) { }

  ngOnInit(): void {
     this.Email = localStorage.getItem('email')
      this.RegService.GetProfile(this.Email).subscribe((data:any)=>{
        this.ProfileData = data
        console.log(data)
      })
  }

}
