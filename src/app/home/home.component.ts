import { ValidatorService } from './../../shared/form_validation/validator.service';
import { HomeService } from './home.service';
import { Routes, Router, ActivatedRoute, Params, RouterModule, Data } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, NgZone } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {
  // Receives array of routerLinks and their Names
  websiteLinks = new Array();
  component = 'DASHBOARD';
  constructor(private activeRoute: ActivatedRoute,
              private homeService: HomeService,
              private router: Router,
              private validate:ValidatorService,
            private validateService: ValidatorService) {
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




