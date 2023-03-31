import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { DatiService } from 'src/app/service/dati.service';
import { DbNegozioService } from 'src/app/service/db-negozio.service';
import { DbService } from 'src/app/service/db-sondaggio.service';
import { DbUserService } from 'src/app/service/db-user.service';
import { User } from '../modelli/user';

@Component({
  selector: 'app-registazione',
  templateUrl: './registazione.component.html',
  styleUrls: ['./registazione.component.css'],
})
export class RegistazioneComponent implements OnInit {



  constructor(
    private db: DbUserService,
    private readonly router: Router,
    private ds: DatiService,
    private dbN : DbNegozioService
  ) {}

 // public user: User;

  items: any;
  emailInvalid: boolean = false;
  emailExist: boolean = false;
  requestItemAdd : {email : string, idProdotto: string} = {email: "", idProdotto : ""}

  ngOnInit() {
      if(localStorage.getItem("idProdotti") ){

    this.ds.setItems(localStorage.getItem("idProdotti") == "" || localStorage.getItem("idProdotti")  ?  localStorage.getItem("idProdotti")!?.split(",").length : 0)

  this.ds.getItems().subscribe((value) => {
    console.log("getItems in OnInit per recuperare il value(osbervable) " + value)
      this.items = value;

  });
}
  }


  onFormSubmit(ngForm: NgForm) {
      this.db.saveUser(ngForm.value).subscribe((data: any) => {
        console.log(data)
        if (data['message']== 'EMAIL NON VALIDA') {
          this.emailInvalid = true;
          ngForm.reset();
        } else if (data['message'] == 'EMAIL ESISTENTE') {
          this.emailExist = true;
          this.emailInvalid = false;
          ngForm.reset();
        } else if (data['message'] == 'REGISTRAZIONE AVVENUTA CORRETTAMENTE') {
          console.log(data['body'])
          this.ds.setLocalStorage('nome', data['body'].nome);
          this.ds.setLocalStorage('cognome', data['body'].cognome);
          this.ds.setLocalStorage('id', data['body'].id);
          this.ds.setLocalStorage('indirizzo', data['body'].indirizzo);
          this.ds.setLocalStorage('citta', data['body'].citta);
          this.ds.setLocalStorage('data di nascita', data['body'].dataNascita);
          this.ds.setLocalStorage('email', data['body'].email);

            if (localStorage.getItem('idProdotti') != null) {
                 this.requestItemAdd.email = data['body'].email
                 this.requestItemAdd.idProdotto =  localStorage.getItem('idProdotti')!
                 this.dbN.addItemFromString(this.requestItemAdd).subscribe()
              }
              this.emailExist = false;
              this.emailInvalid = false;
              this.router.navigate(['/success']);

            }
        })

    }


  }























