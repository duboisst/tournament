import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { NavbarComponent } from './navbar/navbar.component';
import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent } from './tournoi/tournoi.component';

import {TournoiService} from './_services/tournoi.service';
import { InscritsComponent } from './inscrits/inscrits.component';
import { InscriptionComponent, InscriptionTableauComponent } from './inscription/inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TournoisComponent,
    TournoiComponent,
    InscritsComponent,
    InscriptionComponent,
    InscriptionTableauComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [TournoiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
