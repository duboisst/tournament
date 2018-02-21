import { RouterModule, Routes } from '@angular/router';

import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent } from './tournoi/tournoi.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AdminComponent } from './admin/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
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