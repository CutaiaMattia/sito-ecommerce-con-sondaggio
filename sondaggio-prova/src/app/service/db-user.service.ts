import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../componenti/modelli/user';

@Injectable({
  providedIn: 'root'
})
export class DbUserService {
  constructor(private http : HttpClient) { }



  saveUser(user:{}){
    return this.http.post("http://localhost:8080/user",user);
   }

  validationLogin(user:{}){
    return this.http.post("http://localhost:8080/user/validate",user);
   }


   getAnagraficaByEmail(email:string){
    return this.http.get("http://localhost:8080/user/"+email);
   }

}

