import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { delay, interval, Observable } from 'rxjs';
import { DbNegozioService } from 'src/app/service/db-negozio.service';

@Component({
  selector: 'app-prodotto',
  templateUrl: './prodotto.component.html',
  styleUrls: ['./prodotto.component.css']
})
export class ProdottoComponent implements OnInit{

constructor(private route : ActivatedRoute , private db :DbNegozioService) {}
prodotti: any
prodotto : any
isProdotto :boolean



ngOnInit(): void {


  this.isProdotto = !this.route.snapshot.paramMap.get('id') ? false : true;
  if(this.isProdotto){
  this.db.getProdottoById(parseInt(this.route.snapshot.paramMap.get('id')!)).subscribe((data:any) =>{
   this.prodotto = Object.keys(data).map((key)=> {return data[key]})
   console.log(this.prodotto)


  })
  } else{
    this.db.getAllProdotti().subscribe((data:any) =>{
      this.prodotti = Object.keys(data).map((key)=> {return data[key]})
    console.log(this.prodotti)
    })
  }

  }




  }


