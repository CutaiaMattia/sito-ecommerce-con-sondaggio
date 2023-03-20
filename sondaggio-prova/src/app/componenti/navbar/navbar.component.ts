import { Component, OnChanges, OnInit } from '@angular/core';
import { DatiService } from 'src/app/service/dati.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

constructor(private dati : DatiService){}
logged:boolean

ngOnInit(): void {
    this.dati.getLogged().subscribe((value) => {
      this.logged = value;
    });
  }

logout(){
  this.dati.deleteAll()
  this.dati.setLogged(false)
  this.dati.deleteAllLocalStorage

}
}
