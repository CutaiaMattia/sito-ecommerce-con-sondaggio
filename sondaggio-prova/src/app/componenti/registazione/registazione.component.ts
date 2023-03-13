import { Component, OnInit } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { User } from '../modelli/user';

@Component({
  selector: 'app-registazione',
  templateUrl: './registazione.component.html',
  styleUrls: ['./registazione.component.css']
})
export class RegistazioneComponent implements OnInit {
constructor(){}

  public user:User;

  ngOnInit() {

    //Create a new user object
    this.user = new User({nome:"", cognome:"", email:{mail:"", confirmMail:""}, password: { pwd: "" , confirmPwd: ""},citta:"", indirizzo:"", dataNascita:""});
  }

  log(object: any) {
  	console.log(object);
  }

  passwordControll= false;
  //  patternToMatch = String("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")

   onFormSubmit(ngForm : NgForm) {

    	console.log( ngForm);

  	}
}


