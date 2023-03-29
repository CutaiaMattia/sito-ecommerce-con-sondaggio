import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbUserService } from 'src/app/service/db-user.service';

@Component({
  selector: 'app-password-dimenticata',
  templateUrl: './password-dimenticata.component.html',
  styleUrls: ['./password-dimenticata.component.css']
})
export class PasswordDimenticataComponent implements OnInit {
constructor(private dbu : DbUserService, private readonly route: Router, private activeRoute : ActivatedRoute) {}


ngOnInit(): void {
    if(this.isEmail){
      this.dbu.validaEmail(this.activeRoute.snapshot.paramMap.get("email")!).subscribe((x:any)=>{
        if(x['message']  == "email non trovata"){
            this.route.navigate(["/404"])
        }
    })
    }
  }






emailInvalid :boolean = false;
errEmail:boolean = false
isEmail:boolean = !this.activeRoute.snapshot.paramMap.get("email")? false : true
isClicked:boolean = false
isfinish:boolean = false

validaEmail(val :NgForm){
    this.dbu.validaEmail(val.value.email).subscribe((data: any) => {
       Object.keys(data).map((key) => {
        console.log(data[key])
        if(data['message'] == 'email non trovata'){
          console.log(data['message'])
          this.emailInvalid= true
        }else{
          this.isClicked = true
        }
      })
  })
  }


  impostaPassword(val :NgForm){
    this.dbu.updatePassword(this.activeRoute.snapshot.paramMap.get("email")!,val.value).subscribe((data: any) => {
      Object.keys(data).map((key) => {
        console.log(data[key])
        return data[key]
      })
  })

  this.isfinish = true
  }






}
