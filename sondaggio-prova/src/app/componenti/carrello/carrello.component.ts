import { Component, OnInit } from '@angular/core';
import { DbNegozioService } from 'src/app/service/db-negozio.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DbUserService } from 'src/app/service/db-user.service';
registerLocaleData(localeIt, 'it');



@Component({
  selector: 'app-carrello',
  templateUrl: './carrello.component.html',
  styleUrls: ['./carrello.component.css'],
})
export class CarrelloComponent implements OnInit {
  constructor(private db: DbNegozioService, private dbu :DbUserService) {}

  id: number = 0;
  totale :number = 0
  ls :any
  item: number
  carrello : Array<string>
  carrelloItems : Array<any> = []
  prodotto :any

  ngOnInit(): void {
    this.ls = localStorage
    if(localStorage.getItem("email")){
    this.dbu.getAnagraficaByEmail(localStorage.getItem("email")!).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        this.carrello= data[key].idProdotti
        return data[key];
      });
      if(this.carrello){
      for(let i = 0; i<this.carrello.length; i++){
        if(this.carrello[0] != ""){
        this.db.getProdottoById(Number.parseInt(this.carrello[i])).subscribe((data:any)=> {
         this.prodotto = Object.keys(data).map((key)=>{
            return data[key]
          })
          this.totale = this.totale + this.prodotto[8]
          this.carrelloItems.push(this.prodotto)
        });
      }
      }
      }
    });

  } else{
    if(localStorage.getItem("idProdotti")){
    this.carrello = localStorage.getItem("idProdotti")?.split(",")!
      this.item = this.carrello.length


    for(let i = 0; i<this.carrello.length; i++){
      this.db.getProdottoById(Number.parseInt(this.carrello[i])).subscribe((data:any)=> {
       this.prodotto = Object.keys(data).map((key)=>{
          return data[key]
        })
        this.totale = this.totale + this.prodotto[8]
        this.carrelloItems.push(this.prodotto)
      });


    }
    }else{
      this.item = 0
    }
  }
  }

}
