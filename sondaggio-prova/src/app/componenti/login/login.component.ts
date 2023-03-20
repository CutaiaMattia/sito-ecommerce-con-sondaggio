import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatiService } from 'src/app/service/dati.service';
import { DbUserService } from 'src/app/service/db-user.service';
import { User } from '../modelli/user';
import { UserAnagrafica } from '../modelli/UserAnagrafica';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private dbUser: DbUserService,private readonly router:Router ,private ds : DatiService) {}


  user : any

  passwordInvalid: boolean = false
  emailNonValida: boolean = false
  DaLogin = this.ds.daLogin
  valid: any

  click(ngForm: NgForm) {
    this.dbUser.validationLogin(ngForm.value).subscribe((data:any) =>  {
      this.valid = Object.keys(data).map((key)=> {
        return data[key]})
      if(data["message"] == "PASSWORD ERRATA"){
        this.passwordInvalid = true
        ngForm.reset()
      } else if(data["message"] == "EMAIL NON REGISTRATA"){
        this.emailNonValida = true
        this.passwordInvalid = false
        ngForm.reset()
      } else if(data["message"] == "VERIFICATO"){
        this.emailNonValida = false
        this.passwordInvalid = false
        this.DaLogin = true
        this.ds.daLogin = this.DaLogin
        this.dbUser.getAnagraficaByEmail(ngForm.value["email"]).subscribe((data : any) =>
        this.user = Object.keys(data).map(()=> {
          console.log(data["body"])
          this.ds.user = data["body"]
          this.ds.setLocalStorage("nome", data["body"].nome)
          this.ds.setLocalStorage("cognome", data["body"].cognome)
          this.ds.setLocalStorage("id", data["body"].id)
          this.ds.setLocalStorage("indirizzo", data["body"].indirizzo)
          this.ds.setLocalStorage("citta", data["body"].citta)
          this.ds.setLocalStorage("data di nascita", data["body"].dataNascita)
          console.log(this.ds.user)
        return data["body"]})
        )

        this.router.navigate(["/success"])
      }
      })
  }
}
