import {Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DatiService } from 'src/app/service/dati.service';


@Component({
  selector: 'app-sucess',
  templateUrl: './sucess.component.html',
  styleUrls: ['./sucess.component.css']
})
export class SucessComponent implements OnDestroy, OnInit{

constructor(private ds :DatiService, private readonly route : Router) {}

daLogin = this.ds.daLogin
ls:any
time: number = 10;
intervalId: any;


ngOnInit(): void {
    this.ds.setLogged(true);
    this.ds.setCookie("logged",true);
    localStorage.setItem("logged", "true")
    this.ls = localStorage
    this.startTimer()


  }





  startTimer() {
    this.intervalId = setInterval(() => {
      this.time--;
        if(this.time == 0 ){
        this.route.navigate(["/"])
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }


  ngOnDestroy(): void {
    this.daLogin = false
    this.ds.daLogin = this.daLogin
    this.stopTimer()

  }




}
