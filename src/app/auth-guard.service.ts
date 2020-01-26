import { AuthService } from './auth.service';
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router,private auth:AuthService){}
  
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    if(this.auth.userLoggedIn()){
      return true;
    }
    
    this.router.navigateByUrl('/login');
    return false;
    
  }

  
}
