import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;

  constructor(private authService: AuthService,private router: Router,private formBuilder: FormBuilder) {}

  login(){
    console.log('authForm.value:',this.authForm.value);
    this.authService.login(this.authForm.value).subscribe();
  }

  ngOnInit(): void {
    this.authService.authenticationState.subscribe( state =>{
      if(state){
        this.router.navigateByUrl('/admin');
      }
    });

    this.authForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5)]]
    });
  }

}
