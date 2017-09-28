import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  page;
  username;

  ngOnInit()
  {
    this.page = "homePage";
    // this.page = "logInPage";
  }


  changePage(type)
  {
    this.page = type;
  }

  sendUserName(userName)
  {
    this.username = userName;
  }


}
