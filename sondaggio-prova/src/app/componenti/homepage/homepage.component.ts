import { Component, OnInit } from '@angular/core';
import { DbNegozioService } from 'src/app/service/db-negozio.service';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt, 'it');


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit{


  constructor(private db : DbNegozioService){}


prodotti : any
id : number =0
immagini : any



  ngOnInit(): void {
    this.db.getAllProdotti().subscribe((data:any) =>  {
      this.prodotti = Object.keys(data).map((key)=> {return data[key]})
        console.log(this.prodotti)
    })



  }





}
