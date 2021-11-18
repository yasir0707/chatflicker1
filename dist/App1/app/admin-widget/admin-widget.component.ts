import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-widget',
  templateUrl: './admin-widget.component.html',
  styleUrls: ['./admin-widget.component.css']
})
export class AdminWidgetComponent implements OnInit {
  Admin_Token :any;
  Admin_Script:any
  constructor() { }

  ngOnInit(): void {
    this.Admin_Token = localStorage.getItem('Admin_T')
    console.log(this.Admin_Token)
    this.Admin_Script = `<script  src="http://localhost:4200/chat/${this.Admin_Token}"> </script>`
 
  }

}
