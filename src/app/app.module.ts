import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {Ng2Webstorage} from 'ngx-webstorage';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent, NbInscritsComponent } from './tournoi/tournoi.component';

import {TournoiService} from './tournoi.service';
import { InscritsComponent } from './inscrits/inscrits.component';
import { InscriptionComponent, InscriptionTableauComponent } from './inscription/inscription.component';

const appRoutes: Routes = [
  {
    path: 'tournois/tous',
    data: { navTo: 'tous' },
    component: TournoisComponent,
  },
  {
    path: 'tournois/type/:type',
    data: {navTo: 'type'},
    component: TournoisComponent,
  },
  {
    path: 'tournois/autour/:km',
    data: {navTo: 'autour'},
    component: TournoisComponent,
  },
  {
    path: 'tournois/search',
    data: {navTo: 'search'},
    component: TournoisComponent,
  },
  {
    path: 'tournoi/:id',
    component: TournoiComponent,
  },
  {
    path: 'tournoi/:id/inscription',
    component: InscriptionComponent,
  },
  { path: '',
    redirectTo: '/tournois/tous',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TournoisComponent,
    TournoiComponent,
    InscritsComponent,
    NbInscritsComponent,
    InscriptionComponent,
    InscriptionTableauComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule,
    Ng2Webstorage
  ],
  providers: [TournoiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
