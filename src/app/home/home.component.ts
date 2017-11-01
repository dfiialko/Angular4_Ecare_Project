import { Router } from '@angular/router';
import { AuthenticationService } from './../../shared/authentication/authentication.service.ts.service';
import { ValidatorService } from './../../shared/form_validation/validator.service';
import { HomeService } from './home.service';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit, OnDestroy {
  timer: any;
  // Receives array of routerLinks and their Names
  websiteLinks = new Array();
  component = 'DASHBOARD';
  constructor(private homeService: HomeService,
    private validateService: ValidatorService,
    private authService: AuthenticationService,
    private router: Router) { }

  idleInterval;
  idleTime: number = 0;
  idle = false;

  isHere: number = 5;
  isHereinterval;

  @HostListener('window:beforeunload') function() {
    return false;
  }

  @HostListener('mousemove') mouseMove() {
    this.idleTime = 0;
    this.isHere = 5;
  }

  ngOnInit() {
    this.websiteLinks = this.homeService.getLinks();
    this.router.navigate(['/dashboard']);

    this.idleInterval = setInterval(() => {
      this.idleTime++; console.log('idleTime: ' + this.idleTime);
      if (this.idleTime === parseInt(localStorage.getItem('refresh_date'))){
      // if (this.idleTime === 5) {
        this.idle = true;
        if (this.idle === true) {
          this.isHereinterval = setInterval(() => { this.isHere--; if(this.isHere == -1){ alert('Your session has expired');this.router.navigate(['login']);}}
          ,1000);
        }
      }
    }, 1000);
  }
  ngOnDestroy() {
    this.idle = false;
    clearInterval(this.isHereinterval);
    clearInterval(this.idleInterval);
  }

  active() {
    this.idle = false;
    clearInterval(this.isHereinterval);
    this.authService.refresh();
  }

  // Change header signature
  changeHeaderComponent(name) {
    this.component = name;
  }

  // Perform sign out
  signOut() {
    this.authService.logout();
  }
}




