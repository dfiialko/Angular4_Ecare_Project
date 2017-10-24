import { AuthenticationService } from './../../shared/authentication/authentication.service.ts.service';
import { Router } from '@angular/router';
import { ValidatorService } from './../../shared/form_validation/validator.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit  {

  loggedIn = false;
  showhide = true;
  authenticated = true;
  errorMessage: string;
  @ViewChild('email') emailRef: ElementRef;
  @ViewChild('password') passwordRef: ElementRef;
  @ViewChild('spinner') spinner: ElementRef;

  constructor(private _dataService: DataService,
              private _validator: ValidatorService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
    // Clear local storage on logout
    this.authService.logout();
  }


  // Check if login successfull
  login_attempt(attempt) {
    if (attempt) {
      setTimeout(() => this.router.navigate(['/dashboard']), 1000);
    }else {
      console.log(this.authService.error);
        this.errorMessage = this.authService.error;
        this.authenticated = false;
    }

  }
  // Happens when Login button clicked
  logInClick() {
    this.showhide = false;
    // Clear local storage
    this.authService.logout();
    // Check if login successfull

    
    if (this.authService.login(this.emailRef.nativeElement.value, this.passwordRef.nativeElement.value)) {
      this.login_attempt(true);
    }else {
      this.errorMessage = 'Invalid Credentials';
      this.login_attempt(false);
    }

}

  // Triggers when the password reset link was clicked
  resetPasswordClicked() {
    console.log('reset password clicked');
    // this.resetPasswordEmitter.emit('passwordPage');
  }
}
