import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { DatiService } from 'src/app/service/dati.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

constructor(private dati : DatiService){}
logged:boolean
items:number

ngOnInit(): void {

    this.dati.getLogged().subscribe((value) => {
      this.logged = value;
    });

    this.dati.getItems().subscribe((value) => {
      this.items = value;
      console.log(this.items)
      console.log(value)
      return value
    });

    if(localStorage.getItem("logged")){
    this.logged = Boolean( localStorage.getItem("logged")!)
    this.items = Number( localStorage.getItem("items")!)
  }
}



logout(){
  this.dati.deleteAll()
  this.dati.setLogged(false)
  this.dati.deleteAllLocalStorage()
  console.log(localStorage.getItem("logged"))
  this.dati.setItems(0)

}
}
