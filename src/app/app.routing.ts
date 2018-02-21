import { RouterModule, Routes } from '@angular/router';

import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { InscriptionComponent } from './inscription/inscription.component';

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

  export const routing = RouterModule.forRoot(appRoutes);