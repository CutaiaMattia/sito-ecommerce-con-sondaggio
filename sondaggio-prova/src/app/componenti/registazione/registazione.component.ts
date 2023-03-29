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

 idProdottiToArr: string[];
  userToPost: any;
  items: any;
  emailInvalid: boolean = false;
  emailExist: boolean = false;
  idProdottoToSave: string
  itemsToSave : string
  requestItemAdd : {email : string, idProdotto: string} = {email: "", idProdotto : ""}

  ngOnInit() {
    //Create a new user object
    //  this.user = new User({nome:"", cognome:"", email:{mail:"", confirmMail:""}, password: { pwd: "" , confirmPwd: ""},citta:"", indirizzo:"", dataNascita:""});
    this.ds.getItems().subscribe((value: any) => {
      this.items = value;});

  }

  log(object: any) {
    console.log(object);
  }

  //  patternToMatch = String("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
/*
  onFormSubmit(ngForm: NgForm) {
    this.db.saveUser(ngForm.value).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        this.userToPost = data['body']
        if (data['message'] == 'EMAIL NON VALIDA') {
          this.emailInvalid = true;
          ngForm.reset();
        } else if (data['message'] == 'EMAIL ESISTENTE') {
          this.emailExist = true;
          this.emailInvalid = false;
          ngForm.reset();
        } else if (data['message'] == 'REGISTRAZIONE AVVENUTA CORRETTAMENTE') {

          console.log(data['body']);
          this.ds.user = data['body'];
          this.ds.setLocalStorage('nome', data['body'].nome);
          this.ds.setLocalStorage('cognome', data['body'].cognome);
          this.ds.setLocalStorage('id', data['body'].id);
          this.ds.setLocalStorage('indirizzo', data['body'].indirizzo);
          this.ds.setLocalStorage('citta', data['body'].citta);
          this.ds.setLocalStorage('data di nascita', data['body'].dataNascita);
          this.ds.setLocalStorage('email', data['body'].email);

          if (
            localStorage.getItem('idProdotti') != '' &&
            localStorage.getItem('idProdotti') != null
          ) {
            this.idProdottiToSave = localStorage.getItem("idProdotti")!

            this.ds.setLocalStorage(
              'idProdotti',
              this.idProdottiToSave
            );
            this.ds.setLocalStorage(
              'items', this.items
            )

            console.log(this.userToPost)
              this.idProdottiToArr =this.idProdottiToSave.split(",")
              if(this.i < Number(this.idProdottiToArr.length)!){

              console.log(this.i)
              this.requestItemAdd.email = localStorage.getItem("email")!
              this.requestItemAdd.idProdotto =  Number(this.idProdottiToArr[this.i])
              this.dbN.addItem(this.requestItemAdd).subscribe((data:any) =>  {
                Object.keys(data).map((key)=> {
                  return data[key]})
                })
              }


              console.log(this.idProdottiToArr[this.i])
              console.log("aggiunto?")

                  this.i = this.i +1
                  console.log( this.i + " incrementata la variabile contatore di 1")


          } else {
            this.ds.setLocalStorage('idProdotti', data['body'].idProdotti);
            this.ds.setLocalStorage('items', data['body'].idProdotti.length);

            if (data['body'].idProdotti != '') {
              this.ds.setItems(data['body'].idProdotti.length);
            }
          }

          this.emailExist = false;
          this.emailInvalid = false;
          this.router.navigate(['/success']);
        }

        return data[key];
      });
    });
  }
  */









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
        })//chiusura subscribe

    }//chiusura metodo




  }























