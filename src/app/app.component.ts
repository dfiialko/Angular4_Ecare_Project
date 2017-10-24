import { ValidatorService } from './../shared/form_validation/validator.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page;
  username;
  
  constructor(private router: Router, private validatedService: ValidatorService) { }

  ngOnInit() {
    // this.page = 'logInPage';
    // if (this.validatedService.loggedIn === false) {
    //   this.router.navigate(['login']);
    // }
  }

  changePage(type) {
    this.page = type;
  }

  sendUserName(userName) {
    this.username = userName;
  }

}
