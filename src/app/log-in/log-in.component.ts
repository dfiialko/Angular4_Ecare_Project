import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [DataService]
})

export class LogInComponent implements OnInit {

  loggedIn = false;
  token: Array<{access_token: string}> = [];
  authorization_token: string;
  authenticated: boolean;
  showhide = true;

  @ViewChild('email') emailRef: ElementRef;
  @ViewChild('password') passwordRef: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;
  @Output() signInEmitter = new EventEmitter<any>();
  @Output() homePageEmitter = new EventEmitter<any>();
  @Output() resetPasswordEmitter = new EventEmitter<any>();
  @Output() userNameEmitter = new EventEmitter<any>();

  constructor(private _dataService: DataService) { }
  ngOnInit() { }

  /* Triggered when JSON request returns success
     Saves token in the Local Storage
     Gives access to the token */
  login_attempt(attempt) {
    this.showhide = true;
    localStorage.setItem('auth_token', this.token[0].access_token);
    this.authorization_token = localStorage.getItem('auth_token');
    attempt ? this.homePageEmitter.emit('homePage') : this.authenticated = false;
  }
  // Happens when Login button clicked
  logInClick() {
    this.showhide = false;
    console.log('log in clicked');
    const login_data = {
      'grant_type': 'password',
      'client_id': 'clinician_app',
      'client_secret': 'yy9rur9r8748',
      'username': this.emailRef.nativeElement.value,
      'password': this.passwordRef.nativeElement.value
    };
    // Read value from username
    this.userNameEmitter.emit(this.emailRef.nativeElement.value);

    // Use service to send login request
    this._dataService.logIn(login_data).subscribe(
      data => this.token.push(data),
      error => this.login_attempt(false),
      () => { this.authenticated = true;
              this.login_attempt(true); });
  }

  // Triggers when the password reset link was clicked
  resetPasswordClicked() {
    console.log('reset password clicked');
    this.resetPasswordEmitter.emit('passwordPage');
  }
}
