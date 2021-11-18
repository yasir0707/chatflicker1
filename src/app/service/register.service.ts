import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {Register} from '../model/register.model'
import { BehaviorSubject, Observable} from 'rxjs';
import { login } from '../model/login.model';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
BaseUrl:string =`http://localhost:3000/register/`;

private mesageSourse = new BehaviorSubject('Msg')

currentMsg  =  this.mesageSourse.asObservable();


  constructor(private http:HttpClient) {

   }
changeMsg(Msg:any){
  this.mesageSourse.next(Msg)
}
public postEmail(reg:any){
  return this.http.post(this.BaseUrl,reg)
}

public postUser(reg:any,code:any){
    return this.http.post(this.BaseUrl+'add/'+code,reg)
}

public getUser():Observable<Register>{
  return this.http.get<Register>(this.BaseUrl)
}

public UpdateUser(reg:any,id:any){
    return this.http.post<Register>(this.BaseUrl+`/update/${id}`,reg)
}

public DeleteUser(id:any){
  return this.http.delete<Register>(this.BaseUrl+`/delete/${id}`)
}

public LoginUser(reg:Register){
  return this.http.post(this.BaseUrl+'/login',reg)
}
public getLogin(tk:any):Observable<login>{
    return this.http.get<login>(this.BaseUrl+'/login/'+tk)
}

public PostStatus(data:any){
  return this.http.post(this.BaseUrl,data)
}

public GetStatus(email:any){
  return this.http.get(this.BaseUrl+'/login/GetStatus/'+email)
}

public PostForget(data:any){
    return this.http.post(this.BaseUrl+'forget',data)
}

public VerifyEmail(data:any){
  return this.http.post(this.BaseUrl+'u_verify/',data)
}
public Update_Pass(data:any){
  return this.http.post(this.BaseUrl+'u_pass',data)
}
public GetProfile(email:any):Observable<Register>{
  return this.http.get<Register>(this.BaseUrl+email)
}
}
