import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeatureImageService {
  private imgurUrl: string = 'https://api.imgur.com/3/image';
 
  private imageLink: string;
  
  private clientId: any = 'YOUR_CLIENT_ID';
  constructor(private http:HttpClient) {}

  uploadImage(imageFile:File){  
    let formData = new FormData();
    formData.append('image',imageFile, imageFile.name);


    let headers = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });

    return this.http.post(this.imgurUrl , formData, {headers:headers});

    
    

  }
}
