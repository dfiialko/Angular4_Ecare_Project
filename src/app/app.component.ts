import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page;
  username;

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.page = 'homePage';
  }


  changePage(type) {
    this.page = type;
  }

  sendUserName(userName) {
    this.username = userName;
  }

}
