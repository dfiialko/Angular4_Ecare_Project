import { AuthenticationService } from './../../../shared/authentication/authentication.service.ts.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
 
  }
  consoleLog() {
    this.authService.login('doctorD', 'doctorD1234');
  }
}
