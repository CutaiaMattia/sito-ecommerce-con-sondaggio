import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component , OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from 'src/app/service/db-sondaggio.service';


@Component({
  selector: 'app-sondaggio',
  templateUrl: './sondaggio.component.html',
  styleUrls: ['./sondaggio.component.css']
})
export class SondaggioComponent implements OnInit, OnDestroy {
constructor(private db : DbService, private readonly router:Router){}



maxPages:any
cont : number = 1
idSegnalazione : number = 28
domande : any
percorso: number = this.db.percorso
risposta0:any
risposta1:any
risposta2: any
risposteToPost:
  {
    "idSegnalazione": number,
    "idDomande": number,
    "risposta": string
  }
 =
  {
    "idSegnalazione": 0,
    "idDomande": 0,
    "risposta": ""
  }



ngOnInit(): void {
  this.percorso = 0
  this.domande = this.show()
  this.db.abilitaEsito = true
}

post(form : NgForm){
if(this.percorso == 0 && this.cont == 1){
  this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[0].id),"risposta": form.value.domanda0}
  this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta0 = Object.keys(data).map((key)=> {return data[key]})
  console.log(this.risposta0) })
    if(form.value.domanda0 == "si"){
      this.percorso = 1
      console.log("percorso  : "+ this.percorso+ "   cont    : "+ this.cont)
    } else{
      this.percorso = 2
      console.log("percorso  : "+ this.percorso+ "   cont    : "+ this.cont)
    }
} else{
   if(  this.maxPages+1 == this.cont+0.33){
    this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[0].id),"risposta": form.value.domanda0}
    this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta0 = Object.keys(data).map((key)=> {return data[key]})})
    this.cont++
   }else if(this.maxPages+1 == this.cont+0.66){
    this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[0].id),"risposta": form.value.domanda0}
    this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta0 = Object.keys(data).map((key)=> {return data[key]})})
    this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[1].id),"risposta": form.value.domanda1}
    this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta1 = Object.keys(data).map((key)=> {return data[key]}) })
    this.cont++
   } else{
  this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[0].id),"risposta": form.value.domanda0}
  this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta0 = Object.keys(data).map((key)=> {return data[key]}) })
  this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[1].id),"risposta": form.value.domanda1}
  this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta1 = Object.keys(data).map((key)=> {return data[key]})})
  this.risposteToPost = {"idSegnalazione":this.idSegnalazione,"idDomande": (<number> this.domande[2].id),"risposta": form.value.domanda2}
  this.db.postDomanda(this.risposteToPost).subscribe((data:any) =>  {this.risposta2 = Object.keys(data).map((key)=> {return data[key]})})
  this.cont++
   }
}

if(this.maxPages<=this.cont-1){
  this.routeToEsitoComponent()
}
this.show()

}

  show(){
    if(this.cont == 1 || this.maxPages>this.cont){
   this.db.getPage(this.percorso,this.cont).subscribe((data:any) =>  {
    this.domande = Object.keys(data).map((key)=> {return data[key]})
  })
} else{
  this.db.getPage(this.percorso,this.cont).subscribe((data:any) =>  {
    this.domande = Object.keys(data).map((key)=> {return data[key]})
     this.db.percorso = this.percorso
     this.trovaMaxPages()
    })
}


}

btnPrev(){
  if(this.cont == 1){
   this.percorso = 0
   this.db.deleteById(this.risposta0[0]).subscribe()
  }else{
 this.cont = this.cont-1
 this.db.deleteById(this.risposta0[0]).subscribe()
 this.db.deleteById(this.risposta1[0]).subscribe()
 this.db.deleteById(this.risposta2[0]).subscribe()
}
 this.show()
 }


parseArray(i : number){
  return JSON.parse((<string>this.domande[i]["rispostePossibili"]))
 }



 trovaMaxPages(){
 this.db.getMaxPage(this.percorso).subscribe((data:any) => { this.maxPages = data
 })
 }


routeToEsitoComponent(){
  this.router.navigate(['/esito'])
}

ngOnDestroy(): void {
  if(this.maxPages>this.cont-1){
    this.db.deleteAllByIdSegnalazione(this.idSegnalazione).subscribe()
    console.log("cancella tutto")
  }
}

}

