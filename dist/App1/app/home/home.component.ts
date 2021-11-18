import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { RegisterService } from '../service/register.service';

import {MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  str:any;
  showFiller = false;
Reg:any =[]
login_check:any ;
constructor(
  public RegServices:RegisterService
){}

  ngOnInit(){
    this.RegServices.getUser().subscribe((data:any)=>{
      this.Reg = data;
    
      console.log(`login data check ${this.Reg[2].Admin_Email}`)
     
    this.str =    localStorage.getItem('email')
      if(this.str){
        this.login_check = this.str
      }
      else{
        this.login_check = "Login"
      }
    })

  }
  logout(){
    localStorage.removeItem('email')
    window.location.reload()
  }
 
}
