import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts:any;
  url = this.auth.url;

  constructor(private http: HttpClient,private auth: AuthService) { }

  ngOnInit(): void {
    this.http.get(this.url+'/posts').subscribe((data)=>{
    console.log(data);
    this.posts = data;
    this.posts.reverse();
    });
  }

}
