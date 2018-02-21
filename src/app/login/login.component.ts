import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { User } from '../_models/index';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private socialAuthService: AuthService,
        private http: HttpClient,
        private userService: UserService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    public socialSignIn(socialPlatform : string) {
        let socialPlatformProvider;
        if(socialPlatform == "facebook"){
          socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }else if(socialPlatform == "google"){
          socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
        }
        
        this.socialAuthService.signIn(socialPlatformProvider).then(
          (userData) => {
            console.log(socialPlatform+" sign in data : " , userData);
            this.model.username = userData.id;
            this.model.firstName = userData.name;
            this.model.lastName = userData.name;
            this.userService.create(this.model)
            .subscribe(
                data => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });


            // Now sign-in with userData
            localStorage.setItem('currentUser', JSON.stringify(userData));
          }
        );
    }


}