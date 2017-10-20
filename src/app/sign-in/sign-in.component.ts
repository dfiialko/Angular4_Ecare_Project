import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @Input() signInUserName;
  @Output() logInEmitterSignIn = new EventEmitter<any>();
  @Output() addPatientEmitter = new EventEmitter<any>();

  

  constructor() { }

  ngOnInit() {
  }

  logInClicked()
  {
    this.logInEmitterSignIn.emit("logInPage");
  }

  addPatient()
  {

  }

}
