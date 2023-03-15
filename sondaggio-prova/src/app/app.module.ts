import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componenti/navbar/navbar.component';
import { FooterComponent } from './componenti/footer/footer.component';
import { SondaggioComponent } from './componenti/sondaggio/sondaggio.component';
import { NgOptimizedImage } from '@angular/common';
import { HomepageComponent } from './componenti/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EsitoComponent } from './componenti/esito/esito.component';
import { Page404Component } from './componenti/page404/page404.component';
import { ProdottoComponent } from './componenti/prodotto/prodotto.component';
import { LoginComponent } from './componenti/login/login.component';
import { RegistazioneComponent } from './componenti/registazione/registazione.component';
import { AvvenutaRegistrazioneComponent } from './componenti/avvenuta-registrazione/avvenuta-registrazione.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SondaggioComponent,
    HomepageComponent,
    EsitoComponent,
    Page404Component,
    ProdottoComponent,
    LoginComponent,
    RegistazioneComponent,
    AvvenutaRegistrazioneComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
