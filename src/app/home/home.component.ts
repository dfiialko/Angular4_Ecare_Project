import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  constructor(location: PlatformLocation) {
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
