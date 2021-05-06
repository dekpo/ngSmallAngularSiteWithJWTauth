import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './services/jwt.interceptor';

export function jwtOptionsFactory(){
  return {
    tokenGetter: () =>{
      return localStorage.getItem('access_token')
    },
    allowedDomains: ['localhost:443']
  }
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
