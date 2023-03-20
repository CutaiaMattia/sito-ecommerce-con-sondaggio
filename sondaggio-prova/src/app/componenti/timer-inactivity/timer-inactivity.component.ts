import { Component, HostListener } from '@angular/core';
import {  Router } from '@angular/router';
import { DatiService } from 'src/app/service/dati.service';

@Component({
  selector: 'app-timer-inactivity',
  templateUrl: './timer-inactivity.component.html',
  styleUrls: ['./timer-inactivity.component.css']
})
export class TimerInactivityComponent {

constructor(private ds : DatiService, private readonly route : Router) {

}






time: number = 0;
timeoutId: any;

@HostListener('document:mousemove', ['$event'])
@HostListener('document:keydown', ['$event'])
resetTimer(event: MouseEvent | KeyboardEvent) {
  clearTimeout(this.timeoutId);
  this.timeoutId = setTimeout(() => {
    this.time = 0;
    this.ds.setLogged(false)
    this.ds.deleteCookie("logged")
    this.route.navigate(["/"])
    alert(" sei rimasto inattivo per più di 30 minuti")
  }, 10000);
}



}

