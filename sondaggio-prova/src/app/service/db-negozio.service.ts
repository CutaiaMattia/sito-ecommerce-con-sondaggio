import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbNegozioService {

  constructor(private http : HttpClient) { }


  getAllProdotti(){
   return this.http.get("http://localhost:8080/prodotto")
  }


}