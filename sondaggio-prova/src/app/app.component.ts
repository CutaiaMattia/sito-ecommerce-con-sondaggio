import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DatiService } from './service/dati.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  constructor(private dati : DatiService, private cdRef:ChangeDetectorRef) {
  }

/*
logged: boolean





  ngAfterViewChecked(): void {

    this.dati.getLogged().subscribe((value) => {
      this.logged = value;
    });

    this.cdRef.detectChanges();
  }


*/



  title = 'sondaggio-prova';
}
