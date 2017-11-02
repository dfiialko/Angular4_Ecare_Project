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
    // By default homepage is 'home page'
    this.page = 'homePage';
  }

  // Type is a variabe passed from html page,depending on wihch page user clicks
  changePage(type) {
    this.page = type;
  }
  
  // Username is passed from html input
  sendUserName(userName) {
    this.username = userName;
  }

}
