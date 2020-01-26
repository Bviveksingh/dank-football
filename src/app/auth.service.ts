import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService) { }
  
  
  userLoggedIn(){
    const token = localStorage.getItem("auth_token");
    if(!token) return false;
    
    if(this.jwtHelper.isTokenExpired(token)){
      return false;
    }
    return true;
    
  }

  getUser(){
    const token = localStorage.getItem("auth_token");
    const decoded_token = this.jwtHelper.decodeToken(token);
    return decoded_token.identity;
    
  }
  
  signedOut(){
    localStorage.removeItem("auth_token");
  }

}
