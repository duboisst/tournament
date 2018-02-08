import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent, NbInscritsComponent } from './tournoi/tournoi.component';

import {TournoiService} from './tournoi.service';
import { InscritsComponent } from './inscrits/inscrits.component';

const appRoutes: Routes = [
  {
    path: 'tournois/tous',
    component: TournoisComponent,
    // data: { title: 'Tous les tournois' }
  },
  {
    path: 'tournois/type/:type',
    component: TournoisComponent,
  },
  {
    path: 'tournois/autour/:km',
    component: TournoisComponent,
  },
  {
    path: 'tournoi/:id',
    component: TournoiComponent,
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
    NbInscritsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [TournoiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
