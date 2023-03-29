import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DbNegozioService } from 'src/app/service/db-negozio.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { DatiService } from 'src/app/service/dati.service';
registerLocaleData(localeIt, 'it');


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {


  constructor(private db : DbNegozioService, private ds: DatiService){}

prodotti : any
id : number =0
immagini : any
requestItemAdd : {email : string, idProdotto: number} = {email:"", idProdotto:0}
items:number

  ngOnInit(): void {
    this.db.getAllProdotti().subscribe((data:any) =>  {
      this.prodotti = Object.keys(data).map((key)=> {return data[key]})
        console.log(this.prodotti)
    })

    this.ds.getItems().subscribe((value) => {
      this.items = value;
    });

  }




  addItem(idProdotto:number){
    if(localStorage.getItem("email")){
    this.requestItemAdd.email = localStorage.getItem("email")!
    this.requestItemAdd.idProdotto = idProdotto
    console.log(this.requestItemAdd)
    this.db.addItem(this.requestItemAdd).subscribe((data:any) =>  {
      Object.keys(data).map((key)=> {
        if(data[key] != null){
        this.ds.setItems(this.items +1)
        }
        return data[key]})})
      } else {
        if(localStorage.getItem("idProdotti")){
          localStorage.setItem("idProdotti", localStorage.getItem("idProdotti")!.concat(","+ idProdotto))
          this.ds.setItems(this.items +1)

        }else{
        localStorage.setItem("idProdotti", String(idProdotto))
        this.ds.setItems(this.items +1)

        }
      }
  }



}


