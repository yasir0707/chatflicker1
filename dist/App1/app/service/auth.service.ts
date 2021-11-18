import { Injectable } from '@angular/core';
// import { JwtHelperService } from '@auth0/angular-jwt';

// const jwtHeper:any = new JwtHelperService()
@Injectable({
  providedIn: 'root'
})
export class AuthService {
token:any;
  constructor(
  ) { }

  public isAuthenticate(){
     this.token = localStorage.getItem('email') 

      return this.token;
  }
}

// canActivate():boolean{
//   if(!this.auth.isAuthenticate()){
//     this.router.navigate(['login']);
//     return false;
//   }
//   return true;
// }