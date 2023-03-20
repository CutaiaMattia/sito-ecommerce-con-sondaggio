import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserAnagrafica } from '../componenti/modelli/UserAnagrafica';




@Injectable({
  providedIn: 'root'
})
export class DatiService {

  private routerInfo: BehaviorSubject<boolean>;

  constructor(private cookieService:CookieService , private readonly route: Router) {

    this.routerInfo = new BehaviorSubject<boolean>(false);
  }

  user : UserAnagrafica;

  logged:boolean = true
  daLogin:boolean = false

 setLogged(logged: boolean): void {
    this.routerInfo.next(logged);
  }

  getLogged(): Observable<boolean> {
    return this.routerInfo.asObservable();
  }


  setLocalStorage(key : string, value : string){
    localStorage.setItem(key,value)
  }

  deleteAllLocalStorage(){
    localStorage.clear();
  }

 setCookie(key:string, value :any){
   this.cookieService.set(key,value);
   console.log(this.cookieService.getAll())
 }

 deleteCookie(key : string){
   this.cookieService.delete(key);
 }

 deleteAll(){
   this.cookieService.deleteAll();

 }

getCookieName(key:string){
 console.log(this.cookieService.get(key));
 console.log(this.cookieService.check(key))
 console.log(this.cookieService.getAll())
}

getAllCookies(){
 console.log( this.cookieService.getAll())
}






}
