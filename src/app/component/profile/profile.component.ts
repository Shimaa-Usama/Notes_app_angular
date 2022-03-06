import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  allNotes:any;
  token:any;
  decoded:any

  addNoteForm:FormGroup=new FormGroup({
    title:new FormControl('', Validators.required),
    desc:new FormControl('', Validators.required)
  })

  editNoteForm:FormGroup=new FormGroup({
    title:new FormControl('', Validators.required),
    desc:new FormControl('', Validators.required)
  })

  constructor(private _Router:Router, private _NotesService:NotesService) {

  
    this.viewAllNotes()

    // console.log(decoded);
    
    }
    

    // if(!localStorage.getItem('TOKEN')){
    //   this._Router.navigate(['/home'])
    // }
  

  viewAllNotes(){
  try{
    this.token = localStorage.getItem('TOKEN');
    this.decoded = jwt_decode(this.token);
  } catch(error){
    localStorage.clear();
    this._Router.navigate(['/signin'])
  }

    let data={
      token:this.token,
      userID:this.decoded._id
    }
    this._NotesService.getUserNotes(data).subscribe(res=>{
      if(res.message =='success'){
        this.allNotes = res.Notes
      }else{
        localStorage.clear();
        this._Router.navigate(['/signin'])

      }
    })
  }


  addNote(){
    
    let data={
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      citizenID:this.decoded._id,
      token:this.token
    }
  
    console.log(this.addNoteForm.value);
    this._NotesService.addNoteApi(data).subscribe(res=>{

        if(res.message =='success'){
          $('#AddNote').modal('hide');
          this.viewAllNotes()
          this.addNoteForm.reset()

        }
    })
    
  }
  NoteID: any;
  getID(id: any){
    this.NoteID =id    
  }
  deleteNote(){
    let data=
    {
      NoteID:this.NoteID,
      token: this.token
    }
    this._NotesService.deleteNoteApi(data).subscribe(res=>{
      if(res.message =='deleted'){
        $('#deleteModal').modal('hide');
        this.viewAllNotes()

      }
    })
  }


  setValue(){
    for (let index = 0; index < this.allNotes.length; index++) {
      if(this.allNotes[index]._id == this.NoteID){
        console.log(this.allNotes[index]._id);
        console.log(this.editNoteForm);
        
        this.addNoteForm.controls.title.setValue(this.allNotes[index].title)
        this.addNoteForm.controls.desc.setValue(this.allNotes[index].desc)

      }
      
    }
  }

  editNote(){
    let data =
    {
      token:this.token,
      title:this.addNoteForm.value.title,
      desc:this.addNoteForm.value.desc,
      NoteID:this.NoteID
      }
    this._NotesService.EditNoteApi(data).subscribe(res=>{
      if(res.message =='updated'){
        $('#editModal').modal('hide');
        this.viewAllNotes()

      }
    })
  }

  ngOnInit(): void {
  }


}
