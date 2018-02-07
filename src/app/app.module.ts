import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent } from './tournoi/tournoi.component';

import {TournoiService} from './tournoi.service';

const appRoutes: Routes = [
  {
    path: 'tournois',
    component: TournoisComponent,
    // data: { title: 'Book List' }
  },
  {
    path: 'tournoi/:id',
    component: TournoiComponent,
  },
  { path: '',
    redirectTo: '/tournois',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TournoisComponent,
    TournoiComponent
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
