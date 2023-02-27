import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DbService {

abilitaEsito : boolean = false



  constructor(private http : HttpClient) {

  }


  percorso: number = 0


  getPage(percorso:number,pagina:number){
    return this.http.get(`http://localhost:8080/domande/pagina/`+percorso+"/"+pagina)
  }

postDomanda(body :{}){
return this.http.post("http://localhost:8080/segnalazioni",body)
}

getMaxPage(percorso:number){
  return this.http.get("http://localhost:8080/domande/maxPagineForPercorso/"+percorso)
}

deleteById(id:number){
  return this.http.delete("http://localhost:8080/segnalazioni/"+ id)
}

getEsito(idPercorso : number){
  return this.http.get<string>("http://localhost:8080/percorsi/getResult"+idPercorso)
}


deleteAllByIdSegnalazione(idSegnalazione : number){
return this.http.delete("http://localhost:8080/segnalazioni/idSegnalazione/"+idSegnalazione)
}
}
