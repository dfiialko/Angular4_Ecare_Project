import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  loggedIn: boolean = false;

  token: Array<any> = [];

  authenticated: boolean;

  // data=
  // {"grant_type":"password",
  //  "client_id":"clinician_app",
  //  "client_secret": "yy9rur9r8748",
  //  "username":"doctorD",
  //  "password":"doctorD1234"};

  @ViewChild('email') emailRef: ElementRef;
  @ViewChild('password') passwordRef: ElementRef;
  @ViewChild ('spinner') spinner:ElementRef;
  @Output() signInEmitter = new EventEmitter<any>();
  showhide = true;
  @Output() homePageEmitter = new EventEmitter<any>();

  @Output() resetPasswordEmitter = new EventEmitter<any>();

  @Output() userNameEmitter = new EventEmitter<any>();

  constructor(private _dataService: DataService) { }

  // postData: Array<DataService> = [];

  ngOnInit() { }

  signInClicked() {
    console.log('sign in clicked');
    this.signInEmitter.emit("signInPage");
  }

 login_attempt(attempt){
    this.showhide = true;
    if(attempt)
      {
        this.homePageEmitter.emit("homePage");
      }
      else{
      this.authenticated = false;
      }
  }
  logInClick() {
    this.showhide = false;
    console.log('log in clicked');

    let data =
      {
        "grant_type": "password",
        "client_id": "clinician_app",
        "client_secret": "yy9rur9r8748",
        "username": this.emailRef.nativeElement.value,
        "password": this.passwordRef.nativeElement.value
      };

     this.userNameEmitter.emit(this.emailRef.nativeElement.value);

    this._dataService.logIn(data).subscribe(data =>this.token.push(data),
      error => this.login_attempt(false),
      () => { this.authenticated = true;this.login_attempt(true) })
      ;;

    console.log(this.token);

    //  setTimeout(()=> {console.log(this.token[0].access_token)} , 100);
  }

  resetPasswordClicked() {
    console.log('reset password clicked');
    this.resetPasswordEmitter.emit("passwordPage");
  }
}
