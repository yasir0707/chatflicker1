import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import {AdminShowComponent} from '../admin-show/admin-show.component'
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
 
})
@Injectable({
  providedIn: 'root'
})
export class UpdateComponent implements OnInit {
  UpdateId:any | undefined ;


  ngAfterViewInit(): void{

    this.UpdateId=  this.show.UpdateId ;
  }
  

  constructor(
    public RegServices:RegisterService,
    public show:AdminShowComponent
  ) { }
  onSubmit(form:NgForm){
    console.log(form.value+ " " + this.UpdateId)

        this.RegServices.UpdateUser(form.value,this.UpdateId).subscribe(
          (data:any)=>{console.log(`Update Success ${data}`)},
          (err)=>{console.log(err)}

        )
    
  }
  ngOnInit(): void {
  }
 
}
