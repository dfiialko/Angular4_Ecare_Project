import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';
import { PlatformLocation } from '@angular/common'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() homeUserName;
  @Output() logInEmitterHome = new EventEmitter<any>();

  component = 'PATIENTS';
changed = true;
  constructor(location: PlatformLocation,renderer:Renderer,li:ElementRef) {
    location.onPopState(()=>{console.log("pressed")});
   }

  ngOnInit() { }

  signOut() {
    this.logInEmitterHome.emit("logInPage");
  }

  changeComponent(componentInput) {
    this.component = componentInput;
  }

}
