import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trigger } from '../model/trigger.model';

@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  BaseUrl:string =`http://localhost:3000/trigger`;
  admin_email = localStorage.getItem('email')
  constructor(private http:HttpClient) { }



    public postTrigger(trig:any){
        return this.http.post(this.BaseUrl+'/add',trig)
    }
    public getTrigger():Observable<Trigger>{
        return this.http.get<Trigger>(this.BaseUrl)
    }
    public getAdminTrigger():Observable<Trigger>{
      return this.http.get<Trigger>(this.BaseUrl+`/${this.admin_email}`)
  }
    public DeleteTrigger(id:any){
      return this.http.delete<Trigger>(this.BaseUrl+`/delete/${id}`)
    }
    public postTriggerMsg(trig:any){
      return this.http.post(this.BaseUrl+'/trgmsg',trig)
  }
}
