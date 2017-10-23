import { Observable } from 'rxjs/Observable';
import { ValidatorService } from './../../shared/form_validation/validator.service';
import { HomeService } from './home.service';
import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit{
  // Receives array of routerLinks and their Names
  websiteLinks = new Array();
  component = 'DASHBOARD';
  constructor(private homeService: HomeService, private validateService: ValidatorService) { }

  @HostListener('window:beforeunload') function(){
    return false;
  }


  ngOnInit() { 
    this.websiteLinks = this.homeService.getLinks();
    // this.activeRoute.firstChild.data.subscribe((data:Data)=>{this.component = data['message']});
   }  

   changeHeaderComponent(name){
    this.component = name;
  }

  signOut(){
    this.validateService.loggedIn = false;
  }
  
  }




