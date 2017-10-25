import { Router } from '@angular/router';
import { ValidatorService } from './../form_validation/validator.service';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
@Injectable()
export class AuthenticationService {

    constructor(private http: Http,
                private validator: ValidatorService,
                private router: Router) { }
    public authenticated = true;
    public error = '';
    private canactivate = true;
    login(username: string, password: string) {
        if (this.validator.validateInput(username) && this.validator.validateInput(password)) {
            const grant_type = 'password';
            const client_id = 'clinician_app';
            const client_secret = 'yy9rur9r8748';
            this.http.post('http://208.75.74.123:10020/api/oauth/token',
            {grant_type, client_id, client_secret, username, password}).
            map(res => res.json()).
            subscribe(data => {this.saveToken(data); },
                        err => {this.authenticated = false; throw new Error('Invalid Credentials'); });
            return true;
        }else {
            this.error = 'Invalid Email/Password';
            return false;
        }
    }

    private saveToken(data: any) {
        console.log('savetoken function executed');
        localStorage.setItem('auth_token', data.access_token);
        console.log(localStorage.getItem('auth_token'));
        localStorage.setItem('refresh_token', data.refresh_token);
        // localStorage.setItem('refresh_date', (new Date().getMinutes().valueOf()).toString());
        localStorage.setItem('refresh_date', data.refresh_date);
    }
 
    logout() {
        localStorage.clear();
    }

    refresh() {
        const grant_type = 'refresh_token';
        const client_id = 'clinician_app';
        const client_secret = 'yy9rur9r8748';
        const refresh_token = localStorage.getItem('refresh_token');
        this.http.post('http://208.75.74.123:10020/api/oauth/token',
        {grant_type, client_id, client_secret, refresh_token}).
        map(res => res.json()).
        subscribe(data => {this.saveToken(data); },
                err => {this.router.navigate(['/login']); },
                );
    }

    // checkIfExpired() {
    //      console.log('checkifexpired');
    //     //  if (parseInt(localStorage.getItem('refresh_date'), 10) + 6 <= new Date().getMinutes().valueOf() ) {
    //     //     if (confirm('Still there?')) {
    //     //         this.refresh();
    //     //     }else{
    //     //         this.router.navigate(['/login']);
    //     //     }
    //     //  }

    //      if (confirm('Still there?')) {
    //         this.refresh();
    //     }else{
    //         this.router.navigate(['/login']);
    //     }
    //  }
}
