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

ngOnInit(): void {



    this.ds.setLogged(true);
    this.ds.setCookie("logged",true);
    localStorage.setItem("logged", "true")
    this.ls = localStorage


  setTimeout(() => {
    this.route.navigate(["/"])
  }, 10000);
  }



  ngOnDestroy(): void {
    this.daLogin = false
    this.ds.daLogin = this.daLogin
  }




}
