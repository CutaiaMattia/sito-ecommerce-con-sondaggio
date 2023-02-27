import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SondaggioComponent } from './componenti/sondaggio/sondaggio.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { EsitoComponent } from './componenti/esito/esito.component';
import { Page404Component } from './componenti/page404/page404.component';
import { GuardEsitoGuard } from './auth/guard-esito.guard';


const routes: Routes = [
  {path:"" , component:HomepageComponent},
  {path:"sondaggio", component:  SondaggioComponent},

  {path:"404", component:Page404Component},
  {path:"esito", component: EsitoComponent, canActivate :[GuardEsitoGuard]},
  {path:"**", redirectTo: "/404"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
