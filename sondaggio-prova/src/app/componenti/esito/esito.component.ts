import { HttpClientJsonpModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/service/db-sondaggio.service';

@Component({
  selector: 'app-esito',
  templateUrl: './esito.component.html',
  styleUrls: ['./esito.component.css']
})
export class EsitoComponent implements OnInit{

  constructor(private db : DbService) {
  }
  ngOnInit(): void {
   this.db.getEsito(this.db.percorso).subscribe((data:any)=> this.esito = data['desc_percorso'])
  }

  esito: any
  percorso: number = this.db.percorso

}
