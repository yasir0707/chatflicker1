import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agent } from '../model/agent.model';
import { Link } from '../model/link.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  
  BaseUrl:string =`http://localhost:3000/agent`;
  BaseUrl1:string =`http://localhost:3000/link`;

  admin_email = localStorage.getItem('email')
  admin_token = localStorage.getItem('Admin_T');
  constructor(
    public http:HttpClient
  ) { }

  public PostAgent(data:any){
      return this.http.post(this.BaseUrl+'/add',data)
  }
  public AgentPass(data:any){
    return this.http.post(this.BaseUrl+'/addagent',data)
  }
  public getAgent():Observable<Agent>{
    return this.http.get<Agent>(this.BaseUrl+'/show/'+this.admin_token)
  }
  public deleteAgent(id:any){
      return this.http.delete<Agent>(this.BaseUrl+'/delete/'+id)
  }

  public PostLink(data:any){
     return this.http.post(this.BaseUrl1+'/add',data) 
  }
  public getLink():Observable<Link>{
    return this.http.get<Link>(this.BaseUrl1+'/show')
  }

}
