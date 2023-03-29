import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SondaggioComponent } from './componenti/sondaggio/sondaggio.component';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { EsitoComponent } from './componenti/esito/esito.component';
import { Page404Component } from './componenti/page404/page404.component';
import { GuardEsitoGuard } from './auth/guard-esito.guard';
import { ProdottoComponent } from './componenti/prodotto/prodotto.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistazioneComponent } from './componenti/registazione/registazione.component';
import { SucessComponent } from './componenti/sucess/sucess.component';
import { CarrelloComponent } from './componenti/carrello/carrello.component';
import { AttivaAccountComponent } from './componenti/attiva-account/attiva-account.component';
import { PasswordDimenticataComponent } from './componenti/password-dimenticata/password-dimenticata.component';


const routes: Routes = [
  {path:"" , component:HomepageComponent},
  {path:"sondaggio", component:  SondaggioComponent},
  {path:"404", component:Page404Component},
  {path:"login", component: LoginComponent},
  {path:"registrazione", component: RegistazioneComponent},
  {path: "success", component: SucessComponent},
  {path: "attivato", component: AttivaAccountComponent},
  {path: "attivato/:email/:token" , component:AttivaAccountComponent},
  {path: "password-dimenticata", component:PasswordDimenticataComponent},
  {path: "password-dimenticata/:email", component :PasswordDimenticataComponent},
  {path:"esito", component: EsitoComponent, canActivate :[GuardEsitoGuard]},
  {path:"prodotto", component:ProdottoComponent },
  {path:"prodotto/:id", component: ProdottoComponent },
  { path: "carrello", component:CarrelloComponent},
  {path:"**", redirectTo: "/404"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
