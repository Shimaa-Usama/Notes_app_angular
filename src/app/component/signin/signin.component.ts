import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _AuthService:AuthService, private _Router:Router) {

    if(this._AuthService.isLogin()){
      this._Router.navigate(['/signin'])     
    }
   }

  signInForm:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    $('#signIn').particleground();

  }

  signInData(){
    if(this.signInForm.valid){
      this._AuthService.signIn(this.signInForm.value).subscribe(res=>{
        if(res.message == 'success'){

          localStorage.setItem('TOKEN',res.token)  
          this._Router.navigate(['/home'])     
        }

      })
    }

  }
}
