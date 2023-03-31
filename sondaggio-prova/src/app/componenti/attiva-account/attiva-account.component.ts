import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatiService } from 'src/app/service/dati.service';
import { DbNegozioService } from 'src/app/service/db-negozio.service';

@Component({
  selector: 'app-attiva-account',
  templateUrl: './attiva-account.component.html',
  styleUrls: ['./attiva-account.component.css'],
})
export class AttivaAccountComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private dbN: DbNegozioService,
    private route: ActivatedRoute,
    private readonly nav: Router,
    private dati :DatiService
  ) {}


  ngOnChanges(changes: SimpleChanges): void {
    this.isFoudEmail = !this.route.snapshot.paramMap.get('email')
    ? false
    : true;
    if(this.response == "GENERATO"){
     console.log(this.response)
      this.startTimer()
      this.nav.navigate(["/"])


    }
  }


  intervalId: any;
  time: number = 10;
  isFoudEmail: boolean;
  eseguito: boolean;
  isFoudToken: boolean;
  response: any;

  ngOnInit(): void {
    this.isFoudEmail = !this.route.snapshot.paramMap.get('email')
      ? false
      : true;
    this.isFoudToken = !this.route.snapshot.paramMap.get('token')
      ? false
      : true;
    if (this.isFoudEmail && this.isFoudToken) {
      console.log('trovata email e token');

      this.dbN
        .validaAccount(
          this.route.snapshot.paramMap.get('email')!,
          this.route.snapshot.paramMap.get('token')!
        )
        .subscribe((data: any) => {
          Object.keys(data).map((key) => {


            return data[key];
          });

          if (data['message'] == 'VALIDO') {
            console.log(data['message'])
            this.response = 'valido';
            console.log(" prima di settare gli items da attiva-components  "+localStorage.getItem("idProdotti"))
            console.log(" riprende il la stringa idProdotti la splitta e ritorna la lunghezza  "+  localStorage.getItem('idProdotti')!.split(",").length)
            this.dati.setItems(localStorage.getItem('idProdotti')!.split(",").length)
            this.startTimer()
          } else if (data['message'] == 'TOKEN ERRATO') {
            this.response = 'token errato';
            console.log(data['message'])
          } else if (data['message'] == 'TOKEN SCADUTO') {
            this.response = 'token scaduto';
            console.log(data['message'])
          } else if (data['message'] == 'EMAIL GIA ATTIVA') {
            this.response = 'email gia attiva';
            console.log(data['message'])
            this.startTimer()
          } else if (data['message'] == 'EMAIL NON TROVATA') {
            console.log(data['message'])
            this.nav.navigate(["/404"])
          }
        });



    }
  }

  startTimer() {
    this.intervalId = setInterval(() => {
      this.time--;
      console.log(this.time)
      if (this.time == 0) {
        this.nav.navigate(['/']);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    console.log("destroy")
    this.stopTimer();
  }


  reSendValidationEmail(){
    this.isFoudEmail = !this.route.snapshot.paramMap.get('email')
    ? false
    : true;
    this.dbN.generaToken(this.route.snapshot.paramMap.get('email')!).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        this.response = "generato"
        console.log(data['message'])

        return data[key];
      });
      this.startTimer()
    });
  }


}
