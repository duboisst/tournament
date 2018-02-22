import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
 
    login(username: string, password: string) {
        return this.http.post<any>('/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
 
                return user;
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }


    facebookLogin(token: string) : void {
        this.http.post('http://localhost:3000/api/fblogin', { token: token } )
            .subscribe(onSuccess => {
                           //login was successful
                           //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
                           localStorage.setItem('currentUser', JSON.stringify(token));
                   }, onFail => {
                           //login was unsuccessful
                           //show an error message
                   }
            );
    }


}