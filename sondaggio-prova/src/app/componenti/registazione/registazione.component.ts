import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { DbUserService } from 'src/app/service/db-user.service';
import { User } from '../modelli/user';

@Component({
  selector: 'app-registazione',
  templateUrl: './registazione.component.html',
  styleUrls: ['./registazione.component.css']
})
export class RegistazioneComponent implements OnInit {
constructor(private db : DbUserService, private readonly router:Router ){}



  public user:User;
  userToPost : any
  emailInvalid:boolean = false
  emailExist:boolean = false
  response : any

  ngOnInit() {


    //Create a new user object
  //  this.user = new User({nome:"", cognome:"", email:{mail:"", confirmMail:""}, password: { pwd: "" , confirmPwd: ""},citta:"", indirizzo:"", dataNascita:""});
  }


  log(object: any) {
  	console.log(object);
  }

  //  patternToMatch = String("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")

   onFormSubmit(ngForm : NgForm) {
    this.db.saveUser(ngForm.value).subscribe((data:any) =>  {this.userToPost = Object.keys(data).map((key)=> {
      if(data["message"] == "EMAIL NON VALIDA"){
        this.emailInvalid = true
        ngForm.reset()
      } else if(data["message"] == "EMAIL ESISTENTE"){
        this.emailExist = true
        this.emailInvalid = false
        ngForm.reset()
      } else if(data["message"] == "REGISTRAZIONE AVVENUTA CORRETTAMENTE"){
        this.emailExist = false
        this.emailInvalid = false
        this.router.navigate(["/success"])
      }

      return data[key]})
      })
    }





    btnboh(){
      console.log(this.userToPost)
    }



}


