import { Routes, Router} from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, NgZone } from '@angular/core';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  zone: NgZone;
  @Input() homeUserName;
  @Output() logInEmitterHome = new EventEmitter<any>();
  @ViewChild('link') link: ElementRef;
  router: Router;
  component = '';
  changed = true;
  selectedItem: string;
  constructor(location: PlatformLocation, renderer: Renderer) {
    location.onPopState(() => { console.log('pressed'); });
  }

  ngOnInit() {
    this.component = 'PATIENTS';
  }
  changeComponent(componentInput) {
    this.selectedItem = componentInput;
    this.component = componentInput;
  }
  signOut() {
    this.logInEmitterHome.emit('logInPage');
  }
}
