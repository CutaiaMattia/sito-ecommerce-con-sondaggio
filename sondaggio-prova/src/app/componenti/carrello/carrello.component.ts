import { Component, OnInit } from '@angular/core';
import { DbNegozioService } from 'src/app/service/db-negozio.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DbUserService } from 'src/app/service/db-user.service';
import { count } from 'rxjs';
import { DatiService } from 'src/app/service/dati.service';
registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  constructor(private db: DbNegozioService, private dbu: DbUserService,private ds: DatiService) {}


  requestItemAdd : {email : string, idProdotto: number} = {email:"", idProdotto:0}
  items:number
  totale: number = 0;
  ls: any;
  qty: number;
  carrello: Array<string>;
  carrelloQty: Array<number> = [];
  carrelloItems: Array<any> = [];
  prodotto: any;
  mapCarrello: Map<string, number> = new Map();
  idsToShow: Array<string>;
  qtyToShow: Array<number>;

  ngOnInit(): void {
    if(localStorage.getItem("idProdotti") ){

      this.ds.setItems(localStorage.getItem("idProdotti") == "" || localStorage.getItem("idProdotti")  ?  localStorage.getItem("idProdotti")!?.split(",").length : 0)

    this.ds.getItems().subscribe((value) => {
      console.log("getItems in OnInit per recuperare il value(osbervable) " + value)
        this.items = value;

    });
  }
    this.ls = localStorage;

    if (localStorage.getItem('email')) {
      this.dbu
        .getAnagraficaByEmail(localStorage.getItem('email')!)
        .subscribe((data: any) => {
          this.carrello = data['body'].idProdotti;
          if (this.carrello[0] != "") {
            for (let i = 0; i < this.carrello.length; i++) {
              this.mapCarrello.set(
                this.carrello[i],this.mapCarrello.get(this.carrello[i]) ? this.mapCarrello.get(this.carrello[i])! + 1 : 1);
              }
              this.idsToShow = Array.from(this.mapCarrello.keys());
              this.qtyToShow = Array.from(this.mapCarrello.values());
              for (let i = 0; i < this.idsToShow.length; i++) {
              this.db
                .getProdottoById(Number.parseInt(this.idsToShow[i]))
                .subscribe((data: any) => {
                  this.prodotto = data;

                  this.carrelloQty.push(this.qtyToShow[i]);
                  console.log(data);
                  this.totale = this.totale + (this.prodotto.prezzo * this.qtyToShow[i]);
                  this.carrelloItems.push(this.prodotto);
                });
            }
          }
        });
    } else {
      if (localStorage.getItem('idProdotti')) {
        this.carrello = localStorage.getItem('idProdotti')?.split(',')!;
        for (let i = 0; i < this.carrello.length; i++) {
          this.mapCarrello.set(
          this.carrello[i],this.mapCarrello.get(this.carrello[i])? this.mapCarrello.get(this.carrello[i])! + 1: 1
          );
        }
        this.idsToShow = Array.from(this.mapCarrello.keys());
        this.qtyToShow = Array.from(this.mapCarrello.values());
        for (let i = 0; i < this.idsToShow.length; i++) {
          this.db
            .getProdottoById(Number.parseInt(this.idsToShow[i]))
            .subscribe((data: any) => {
              this.prodotto = data;
              this.carrelloQty.push(this.qtyToShow[i]);
              this.totale = this.totale + (this.prodotto.prezzo * this.qtyToShow[i]);
              this.carrelloItems.push(this.prodotto);
            });
        }
      }
    }
  }



  addItem(idProdotto:number, prezzo :number ,i:number){
    if(localStorage.getItem("email")){
    this.requestItemAdd.email = localStorage.getItem("email")!
    this.requestItemAdd.idProdotto = idProdotto
    this.db.addItem(this.requestItemAdd).subscribe((data:any) =>  {
      Object.keys(data).map((key)=> {
        if(data[key] != null){
          console.log("else di localstorage.getItem(email)   ")
          if(localStorage.getItem("idProdotti")){
            console.log("(dentro metodo addItem) setItem se data[key]!= null e anche idProdotti esiste ")
            console.log("idProdotti  =  "+ localStorage.getItem("idProdotti"))
            localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.concat(","+ idProdotto))
            console.log("  idProdotti con aggiunta del prodotto e il concat"+ localStorage.getItem("idProdotti"))
            console.log("items prima di essere incrementato  = "+this.items)
            this.ds.setItems(this.items +1)
            console.log("items dopo di essere incrementato  = "+this.items)
            this.carrelloQty[i] = this.carrelloQty[i] +1
            this.totale =this.totale + prezzo
          }else{
            console.log("else di idProdotto esiste")
          localStorage.setItem("idProdotti", String(idProdotto))
          console.log("items prima di essere incrementato  = "+this.items)
          this.ds.setItems(this.items +1)
          console.log("items dopo di essere incrementato  = "+this.items)
          this.carrelloQty[i] = this.carrelloQty[i] +1
          this.totale =this.totale + prezzo

          }
        }
        return data[key]})})
      } else {
        console.log("else di localstorage.getItem(email)   ")
        if(localStorage.getItem("idProdotti")){
          console.log("(dentro metodo addItem) setItem se data[key]!= null e anche idProdotti esiste ")
          console.log("idProdotti  =  "+ localStorage.getItem("idProdotti"))
          localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.concat(","+ idProdotto))
          console.log("  idProdotti con aggiunta del prodotto e il concat"+ localStorage.getItem("idProdotti"))
          console.log("items prima di essere incrementato  = "+this.items)
          this.ds.setItems(this.items +1)
          console.log("items dopo di essere incrementato  = "+this.items)
          this.carrelloQty[i] = this.carrelloQty[i] +1
          this.totale =this.totale + prezzo
        }else{
          console.log("else di idProdotto esiste")
        localStorage.setItem("idProdotti", String(idProdotto))
        console.log("items prima di essere incrementato  = "+this.items)
        this.ds.setItems(this.items +1)
        console.log("items dopo di essere incrementato  = "+this.items)
        this.carrelloQty[i] = this.carrelloQty[i] +1
        this.totale =this.totale + prezzo

        }
      }
  }

  removeItem(idProdotto:number, prezzo :number ,i:number){
    if(localStorage.getItem("email")){
    this.requestItemAdd.email = localStorage.getItem("email")!
    this.requestItemAdd.idProdotto = idProdotto


    this.db.removeItem(this.requestItemAdd).subscribe((data:any) =>  {
      Object.keys(data).map((key)=> {
        if(data[key] != null){
          console.log("pattern regex "+ idProdotto+" =  " + localStorage.getItem("idProdotti")?.includes(","+idProdotto) )
          if(localStorage.getItem("idProdotti")?.includes(","+idProdotto) ){
            localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.replace(","+idProdotto , ""))
          } else if(localStorage.getItem("idProdotti")?.includes(""+idProdotto) ){
            localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.replace(""+idProdotto , ""))
          }

        this.ds.setItems(this.items -1)
          this.totale =this.totale - prezzo
        this.carrelloQty[i] = this.carrelloQty[i] -1
        }
        return data[key]})})
      } else {

        console.log("pattern regex "+ idProdotto+" =  " + localStorage.getItem("idProdotti")?.includes(","+idProdotto) )
      if(localStorage.getItem("idProdotti")?.includes(","+idProdotto) ){
        localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.replace(","+idProdotto , ""))
      } else if(localStorage.getItem("idProdotti")?.includes(""+idProdotto) ){
        localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.replace(""+idProdotto , ""))
      }

          this.ds.setItems(this.items -1)
          this.carrelloQty[i] = this.carrelloQty[i] -1
          this.totale =this.totale - prezzo

      }
  }



}
