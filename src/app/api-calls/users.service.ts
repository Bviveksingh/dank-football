import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private add_user_url = "http://localhost:5000/add_user";
  private get_user_url = "http://localhost:5000/user/";
  constructor(private http: HttpClient) { }

  registerUser(form:any){
    this.http.post(this.add_user_url, form)
    .subscribe((result)=>{
      console.log(result as JSON);
    })
  
  }

  getUserProfile(id:string){
    return this.http.get(this.get_user_url + id);
  } 
}
