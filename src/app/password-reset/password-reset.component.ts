import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  emailInput = '';

  @Input() email;

  @Output() logInEmitterPassword = new EventEmitter<any>();


  constructor() {   }

  logInClicked()
  {
    this.logInEmitterPassword.emit("logInPage");
  }


  sendEmail()
  {
    return "http://208.75.74.123:3030/submit/";
  }

  ngOnInit() {
  }

}
