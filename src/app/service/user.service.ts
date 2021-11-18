import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { User } from '../model/user.model';
import { Address } from  '../model/address.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BaseUrl:string =`http://localhost:3000/`;
  constructor(
    public http:HttpClient
  ) { }
 

  public PostUser(user:User,adminemail:any){
   return this.http.post(this.BaseUrl+'user/'+adminemail,user)

  }
  public getUser():Observable<User>{
    return this.http.get<User>(this.BaseUrl+'user')
  }

  public deleteUser(id:any){
    return this.http.delete<User>(this.BaseUrl+'user/delete/'+id);
  }

  public postAddress(addr:any){
    return this.http.post(this.BaseUrl+`user/address/loc`,addr)
  }
  public getAddress(adminemail:any):Observable<Address>{
    return this.http.get<Address>(this.BaseUrl+`user/getaddress/${adminemail}`)
  }
  

}
