import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient ) { }

  baseURL ='https://routeegypt.herokuapp.com/';

  signIn(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signin', data);
  }
  
  signUp(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signup', data);
  }
  signOut(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'signOut', data);
  }
  isLogin(){
    return !!localStorage.getItem('TOKEN')
  }
}
