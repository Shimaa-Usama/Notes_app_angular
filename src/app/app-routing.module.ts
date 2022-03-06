import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/Guards/auth.guard';
import { NotfoundComponent } from './component/notfound/notfound.component';
import { ProfileComponent } from './component/profile/profile.component';
import { SigninComponent } from './component/signin/signin.component';
import { SignupComponent } from './component/signup/signup.component';


const routes: Routes = [
  {path:'', redirectTo:'signup',pathMatch:'full'},
  {path:'signup', component:SignupComponent},
  {path:'signin', component:SigninComponent},
  {path:'home', canActivate:[AuthGuard], component:ProfileComponent},
  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
