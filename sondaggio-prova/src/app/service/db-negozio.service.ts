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


  getImageByIdProdotto(idProdotto : number){
    return this.http.get("http://localhost:8080/immagine/prodotto/"+ idProdotto)
  }


  getProdottoById(idProdotto: number){
    return this.http.get("http://localhost:8080/prodotto/"+ idProdotto)
  }

  addItem(body:{}){
    return this.http.put("http://localhost:8080/user/add",body)
  }

  removeItem(body:{}){
    return this.http.put("http://localhost:8080/user/removeItem",body)
  }


  addItemFromString(body:{}){
    return this.http.put("http://localhost:8080/user/addFromString",body)
  }



  validaAccount(email: string, token : string){
    return this.http.put("http://localhost:8080/user/valida/"+email+"/"+token,null)
  }

  generaToken(email:string){
    return this.http.put("http://localhost:8080/user/generate/"+email,null)
  }


}
