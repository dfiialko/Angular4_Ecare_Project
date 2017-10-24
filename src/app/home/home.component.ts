import { Router } from '@angular/router';
import { AuthenticationService } from './../../shared/authentication/authentication.service.ts.service';
import { ValidatorService } from './../../shared/form_validation/validator.service';
import { HomeService } from './home.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
    private router:Router) { }


  ngOnInit() {
    this.websiteLinks = this.homeService.getLinks();
    this.timer = setInterval(() => {this.authService.checkIfExpired(); }, 10000);
    this.router.navigate(['/dashboard']);
  }
  ngOnDestroy(): void {
    clearInterval(this.timer);
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




