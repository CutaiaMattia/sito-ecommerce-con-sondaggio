import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DatiService } from 'src/app/service/dati.service';
import { DbUserService } from 'src/app/service/db-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  constructor(private dbUser: DbUserService,private readonly router:Router ,private ds : DatiService) {}
  ngOnInit(): void {
    if(localStorage.getItem("idProdotti") ){

      this.ds.setItems(localStorage.getItem("idProdotti") == "" || localStorage.getItem("idProdotti")  ?  localStorage.getItem("idProdotti")!?.split(",").length : 0)

    this.ds.getItems().subscribe((value) => {
      console.log("getItems in OnInit per recuperare il value(osbervable) " + value)
        this.items = value;
        console.log(this.items)

    });
  }
  }


  user : any
  items:number
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
        this.emailNonValida = false
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
          this.ds.setLocalStorage("idProdotti", data["body"].idProdotti)
          this.ds.setLocalStorage("email", data["body"].email)


        return data["body"]})
        )
        this.router.navigate(["/success"])
      }
      })
  }




}
