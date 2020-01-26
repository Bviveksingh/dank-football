import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  private register_url='http://localhost:5000/add_user';
  private login_url = 'http://localhost:5000/login';
  constructor(private http:HttpClient) { }

  login(form:FormGroup){
    return this.http.post(this.login_url,form)
    .pipe(
      map((response:any)=>{
        if(response && response.token){
          localStorage.setItem("auth_token",response.token);
          return true;
        }
        return false;
      })
    )
  }

  register(form:FormGroup){
    return this.http.post(this.register_url,form);
  }
}
