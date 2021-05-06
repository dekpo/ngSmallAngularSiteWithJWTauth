import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  postForm: FormGroup;

  constructor(private helper: JwtHelperService,private authService: AuthService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder) { }

  post(){
    // console.log(this.authService.url+'/posts => ',this.postForm.value);
    this.send(this.authService.url+'/posts').subscribe();
    const token = localStorage.getItem('access_token');
    const exp = this.helper.getTokenExpirationDate(token);
    console.log('Expiration ',exp);
  }

  send(post){
    return this.http.post(post, this.postForm.value).pipe(
      tap( res =>{
        console.log('Post Res:',res);
        this.router.navigateByUrl('/blog');
      }),
      catchError( e =>{
        alert(e.error.message);
        throw e;
      })
    )
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['',[Validators.required]],
      text: ['',[Validators.required]]
    });
  }

}
