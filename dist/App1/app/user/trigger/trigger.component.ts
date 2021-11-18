import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TriggerService } from 'src/app/service/trigger.service';
import { switchMap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  description: string;
  Email: string;
  Action:string
  }
  
  let Reg:PeriodicElement[] =[];
@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent implements OnInit {

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild('scrollMe')
  private myScrollContainer!: ElementRef;

  items = Array.from({length: 1000}).map((_, i) => `Item #${i}`);
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  constructor(
    public trig_service:TriggerService
  ) { }

  ngOnInit(): void {
    this.scrollToBottom();
      this.trig_service.getTrigger().subscribe((data:any)=>{
        console.log(data)
        this.dataSource.data = data
      })
  }


  displayedColumns: string[] = [ 'name', 'Email', 'description','Action'];
  dataSource = new MatTableDataSource(Reg);


  deleteTrigger(id:any){
      this.trig_service.DeleteTrigger(id).subscribe((data:any)=>{
        console.log(data)
      })
      window.location.reload();
  }
}
