import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FeatureImageService {
  private imgurUrl: string = 'https://api.imgur.com/3/image';
 
  private imageLink: string;
  private token:any = '0a64656d315e3cce26277133f36b33f9c8e97a5b';
  private clientId: any = '1d97dcaf9d7b104';
  constructor(private http:HttpClient) {}

  // uploadImage(imageFile:File): Observable<any>{  
  //   let formData = new FormData();
  //   formData.append('image',imageFile, imageFile.name);


  //   let headers = new HttpHeaders({
  //     "authorization": 'Client-ID '+this.clientId
  //   })
  //   return this.http.post(this.imgurUrl , formData, {headers:headers});

  // }
  uploadImage(imageFile:File){  
    let formData = new FormData();
    formData.append('image',imageFile, imageFile.name);


    let headers = new HttpHeaders({
      "authorization": 'Client-ID '+this.clientId
    });

    return this.http.post(this.imgurUrl , formData, {headers:headers});

    
    // this.imageLink = imageData['data'].link;

    // return this.imageLink;    

  }
}
