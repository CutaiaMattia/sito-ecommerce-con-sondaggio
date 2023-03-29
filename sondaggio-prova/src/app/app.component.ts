import { ChangeDetectorRef, Component, OnDestroy, } from '@angular/core';
import { DatiService } from './service/dati.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{


  constructor(private dati : DatiService, private cdRef:ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    localStorage.clear()
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
