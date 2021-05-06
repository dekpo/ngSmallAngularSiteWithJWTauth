import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BlogComponent } from './blog/blog.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,
  canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
