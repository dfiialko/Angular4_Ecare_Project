import { AuthenticationService } from './../../shared/authentication/authentication.service.ts.service';
import { ValidatorService } from './../../shared/form_validation/validator.service';
import { HomeService } from './home.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy{
  timer: any;
  // Receives array of routerLinks and their Names
  websiteLinks = new Array();
  component = 'DASHBOARD';
  constructor(private homeService: HomeService, 
              private validateService: ValidatorService,
              private authService: AuthenticationService) { }


  ngOnInit() {
    this.websiteLinks = this.homeService.getLinks();
    this.timer = setInterval(() => {
      this.authService.checkIfExpired();
  }, 10000);
   }
   ngOnDestroy(): void {
    clearInterval(this.timer);
  }
   ngAfterViewInit() {
     console.log('after view init');
     console.log(this.authService.authenticated);
    //  if (this.authService.authenticated) {
    //   this.authService.checkIfExpired();
    //  }
     // setInterval(() => (confirm('Confirm you are still here'), this.authService.refresh()), 10000);
   }
   changeHeaderComponent(name){
    this.component = name;
  }

  signOut() {
    this.authService.logout();
  }
  }




