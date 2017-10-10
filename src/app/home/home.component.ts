import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { PlatformLocation } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() homeUserName;
  @Output() logInEmitterHome = new EventEmitter<any>();
  @ViewChild('link') link: ElementRef;
  component = 'PATIENTS';
  changed = true;
  selectedItem: string;
  constructor(location: PlatformLocation, renderer: Renderer) {
    location.onPopState(() => { console.log('pressed'); });
  }

  ngOnInit() { 
    this.selectedItem = this.component;
  }
  changeComponent(componentInput) {
    this.selectedItem = componentInput;
    console.log(this.selectedItem);
    this.component = componentInput;
  }
  signOut() {
    this.logInEmitterHome.emit('logInPage');
  }
}
