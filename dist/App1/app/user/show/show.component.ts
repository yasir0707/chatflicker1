import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import {Chat} from 'src/app/model/chat.model'
import { switchMap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import { isDataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

export interface PeriodicElement {
  name: string;
  position: number;
  Email: string;
  Company: string;
  Action:string
}

let Reg:PeriodicElement[] =[];

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  user$ :Observable<Array<{ Chat: any; } >> | undefined ;

  refresh_User$ = new BehaviorSubject<boolean>(true);

  user_id:any;
  user_msg:any;
  user:any=[];
User:any =[]
  dataRefresher: any;
  lat:any
  lng:any
  
  constructor(
    public UseServices:UserService,
    public ChatServices:ChatService,
    public router:Router,
    public http:HttpClient
    ) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {

    if(!navigator.geolocation){
      console.log('Not Support location')
    }
    navigator.geolocation.getCurrentPosition((position)=>{
    this.lat = position.coords.latitude
    this.lng = position.coords.longitude
      console.log(
        `Lat:${position.coords.latitude},lang:${position.coords.longitude}`
      )
      var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.lat+','+this.lng+'&key=AIzaSyCHG5rBjHVsRNFYmPv1c-yKJgvmlpd7hWA'
      this.http.get(url).subscribe((data:any)=>{
        console.log(data)
      })
      console.log('url',url)
  
    })

   
    this.User = this.refresh_User$.pipe(switchMap(_ => this.ChatServices.getChat()));
    console.log("user data",this.User)

    this.refreshData();  
  }
  getData(_setPageFlag: boolean){
    this.UseServices.getUser().subscribe((data:any)=>{
      this.User  = data
  
      console.log(data)
      this.dataSource.data = data

    })
  
  }

refreshData(){
  this.dataRefresher =
    setInterval(() => {
      this.getData(false);
      //Passing the false flag would prevent page reset to 1 and hinder user interaction
    }, 10000);  
}
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  deleteUser(id:any){
    this.UseServices.deleteUser(id).subscribe((data:any)=>{
        console.log(data);
        this.reloadComponent(),
        (err:any)=>{console.log("error",err)}

    })
    // window.location.reload()
  }

  
  displayedColumns: string[] = ['position', 'name', 'Email', 'Company','Action'];
  dataSource = new MatTableDataSource(Reg);
}
