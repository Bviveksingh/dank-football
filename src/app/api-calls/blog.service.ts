import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private add_blog_url: string  = 'http://localhost:5000/add_blog';
  private get_blog_url:string = 'http://localhost:5000/blog/';
  private get_all_blogs_url:string = 'http://localhost:5000/blogs';
  private get_upvote_url:string = 'http://localhost:5000/upvotes_blog/';
  private add_upvote_url:string = 'http://localhost:5000/add_upvote';
  private check_upvote_url:string = 'http://localhost:5000/check_upvote/';
  private downvote_url:string = 'http://localhost:5000/downvote/';

  constructor(private http:HttpClient) { }

  addBlog(blogProps:any){
    let header = new HttpHeaders({
      'authorization': 'Bearer'+localStorage.getItem("auth_token")
    })
    return this.http.post(this.add_blog_url, blogProps, {headers:header});
  }

  getAllBlogs(){
    return this.http.get(this.get_all_blogs_url);
  }

  getBlogById(id:string){
    return this.http.get(this.get_blog_url + id);
  }
  
  async checkIfUserAlreadyUpvoted(user_id:string, blog_id:string){
    return await this.http.get(this.check_upvote_url + user_id + "/" + blog_id).toPromise();
  }

  downvote(user_id:string, blog_id:string){
    return this.http.delete(this.downvote_url + user_id + "/" + blog_id);
  }
  addUpvoteByUser(user_id:string, blog_id:string){
    let body = {
      user_id:user_id,
      blog_id: blog_id
    }
    return this.http.post(this.add_upvote_url,body);

  }

  getAllUpvotes(id:string){
    return this.http.get(this.get_upvote_url + id);
  }
}
