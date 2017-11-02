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
  // Default component is dashboard
  component = 'DASHBOARD';
  
  constructor(private homeService: HomeService,
    private validateService: ValidatorService,
    private authService: AuthenticationService,
    private router: Router) { }
  // Set variables for idle interval method
  idleInterval;
  idleTime: number = 0;
  idle = false;
  // Set count to check if person is responding to the alert pop-up
  isHere: number = 5;
  isHereinterval;

  // Return false when window is closed or reloaded
  @HostListener('window:beforeunload') function() {
    return false;
  }

  // Reset idle time when mouse moves
  @HostListener('mousemove') mouseMove() {
    this.idleTime = 0;
    this.isHere = 5;
  }

  ngOnInit() {
    // Returns links in the array stored within homeService service
    this.websiteLinks = this.homeService.getLinks();
    // By default navigates to the dashboard
    this.router.navigate(['/dashboard']);
    // Set interval function to count idle time
    this.idleInterval = setInterval(() => {
      this.idleTime++; 
      if (this.idleTime === parseInt(localStorage.getItem('refresh_date'))){
      // if (this.idleTime === 5) {
        this.idle = true;
        // IF person is away and have not moved mouse for certain period of time show warning,later logout
        if (this.idle === true) {
          this.isHereinterval = setInterval(() => { this.isHere--; if(this.isHere == -1){ alert('Your session has expired');this.router.navigate(['login']);}}
          ,1000);
        }
      }
    }, 1000);
  }
  // Once the component is destroyes cleat interval and set idle count to false
  ngOnDestroy() {
    this.idle = false;
    clearInterval(this.isHereinterval);
    clearInterval(this.idleInterval);
  }
  
//   // 
//   active() {
//     this.idle = false;
//     clearInterval(this.isHereinterval);
//     this.authService.refresh();
//   }

  // Change header signature
  changeHeaderComponent(name) {
    this.component = name;
  }

  // Perform sign out
  signOut() {
    this.authService.logout();
  }
}




