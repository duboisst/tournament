import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular5-social-login";

// used to create fake backend
import { fakeUserBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { NavbarComponent } from './navbar/navbar.component';
import { TournoisComponent } from './tournois/tournois.component';
import { TournoiComponent, NbInscritsComponent } from './tournoi/tournoi.component';

import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import {TournoiService} from './_services/tournoi.service';

import { InscritsComponent } from './inscrits/inscrits.component';
import { InscriptionComponent, InscriptionTableauComponent } from './inscription/inscription.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("708625712860653")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("Your-Google-Client-Id")
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TournoisComponent,
    TournoiComponent,
    InscritsComponent,
    NbInscritsComponent,
    InscriptionComponent,
    InscriptionTableauComponent,
    AdminComponent,
    LoginComponent,
    AlertComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    SocialLoginModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtInterceptor,
        multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    // provider used to create fake backend
    fakeUserBackendProvider,
    TournoiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
