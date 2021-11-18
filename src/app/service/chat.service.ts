import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject, Subject} from 'rxjs';
import { HttpClient,HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Chat } from '../model/chat.model';
import { tap,map } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload';
// import Map  from 'typescript';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  BaseUrl:string =`http://localhost:3000/chat/`;

  str =    localStorage.getItem('email');
  u_str =    localStorage.getItem('useremail');
  public isUser :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public msg:any ; 

  headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  requestOptions = {                                                                                                                                                                                 
    headers: new Headers(this.headerDict), 
  };
  constructor(
    public http:HttpClient
  ) { }


uploader: FileUploader = new FileUploader({url:this.BaseUrl,removeAfterUpload:false,autoUpload:true})
public PostUser(chat:any){
  console.log("chat", chat)

  return this.http.post<any>(this.BaseUrl,chat,{headers:this.headerDict}).pipe(
    map(res => res.data.values)
  )

  
 
}

public getChat( ):Observable<Chat>{
  return this.http.get<Chat>(this.BaseUrl)
}
public getAdminChat( ):Observable<Chat>{
  return this.http.get<Chat>(this.BaseUrl+`${this.str}`)
}
public getUserChat():Observable<Chat>{
    return this.http.get<Chat>(this.BaseUrl+`user/${this.str}/${this.u_str}`)
}
public PostStatus(data:any,id:any){
    return this.http.post<any>(this.BaseUrl+`status/${id}`,data)   
}
public PostUserStatus(data:any,id:any){
    return this.http.post<any>(this.BaseUrl+`userstatus/${id}`,data)   
}
public DeleteChat(id:any){
  return this.http.delete<Chat>(this.BaseUrl+`delete/${id}`)
}
public Chat(user:any){
  this.msg = user;
  return  user
 
}

}
