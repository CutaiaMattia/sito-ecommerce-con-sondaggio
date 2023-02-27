
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService } from '../service/db-sondaggio.service';

@Injectable({
  providedIn: 'root'
})
export class GuardEsitoGuard implements CanActivate {
constructor(private db: DbService, private readonly router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.db.abilitaEsito== false){
        this.router.navigate(["/404"])
      }
    return this.db.abilitaEsito;
  }



}
