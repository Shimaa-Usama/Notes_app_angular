import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service'
declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  isClicked = false;
  isMessageSuccess= false;
  failResponse ='';
  responseMessage='';
  constructor(private _AuthService:AuthService) { }


  signUpForm:FormGroup = new FormGroup({
    first_name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    last_name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    age:new FormControl('', Validators.required),
    password:new FormControl('', [Validators.required])
  })


  ngOnInit(): void {
    $('#signUp').particleground();
  }


  signUpData(){


    this.isClicked=true;

    if(this.signUpForm.valid){
      console.log(this.signUpForm.value);
      
      this._AuthService.signUp(this.signUpForm.value).subscribe(response =>{
        
        if(response.message == 'success'){

          this.isClicked=false;
          this.isMessageSuccess = true;
          this.signUpForm.reset();
          this.responseMessage =response.message

        }
        else{
          this.isMessageSuccess = false;
          this.isClicked=false;

          this.failResponse = response.errors.email.message
        }
        console.log(response);

        
      })
    }

    
  }

}
