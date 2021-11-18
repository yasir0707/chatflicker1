import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  BaseUrl:string =`http://localhost:3000/role`;
  admin_email = localStorage.getItem('email')
  admin_token = localStorage.getItem('Admin_T')
  constructor(public http:HttpClient) { }

  public PostRole(data:any){
     return this.http.post(this.BaseUrl+'/add',data)
  }
  public getRole():Observable<Role>{
    return this.http.get<Role>(this.BaseUrl+'/show')
  }
  public deleteRole(id:any){
      return this.http.delete<Role>(this.BaseUrl+'/delete/'+id)
  }
  public PostAdminRole(data:any){
    return this.http.post(this.BaseUrl+'/admin_add',data)
 }
 public getAdminRole():Observable<Role>{
   return this.http.get<Role>(this.BaseUrl+'/admin_show/'+this.admin_token)
 }
 public getShowAdminRole():Observable<Role>{
  return this.http.get<Role>(this.BaseUrl+'/admin_show_role/'+this.admin_token)

 }
 public deleteAdminRole(id:any){
     return this.http.delete<Role>(this.BaseUrl+'/admin_delete/'+id)
 }
}
