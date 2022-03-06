import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  
  baseURL ='https://routeegypt.herokuapp.com/';
 
 
  constructor(private _HttpClient:HttpClient) {

   }
 

  getUserNotes(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'getUserNotes', data);
  }
  addNoteApi(data: any):Observable<any>
  {
    return this._HttpClient.post(this.baseURL+'addNote', data);
  }
  deleteNoteApi(data: any):Observable<any>
  {
    let options={
      headers:new HttpHeaders({}),
      body:{
        NoteID:data.NoteID,
      token: data.token
      }
    }
    return this._HttpClient.delete(this.baseURL+'deleteNote', options);
  }

  EditNoteApi(data: any):Observable<any>
  {
    return this._HttpClient.put(this.baseURL+'updateNote', data);
  }
}
