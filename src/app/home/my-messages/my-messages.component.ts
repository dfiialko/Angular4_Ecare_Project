import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-messages',
  templateUrl: './my-messages.component.html',
  styleUrls: ['./my-messages.component.css']
})
export class MyMessagesComponent implements OnInit {
  check = null;
  messages: Array<any> = [{
    from: 'Risa P.Valentine', dateReceived: '2015-03-01 10:30AM', subject: 'Feeling dizzy after taking medication',
    status: 'Received', reply: 'Reply'
  },
  {
    from: 'Ocean Fulton', dateReceived: '2015-03-01 10:30AM', subject: 'Feeling dizzy after taking medication',
    status: 'Received', reply: 'Reply'
  },
  {
    from: 'Macon Moore', dateReceived: '2015-03-01 10:30AM', subject: 'Feeling dizzy after taking medication',
    status: 'Received', reply: 'Reply'
  }];

  constructor() { }

  ngOnInit() {
  }
  checkAll() {
    if (this.check === null) {
      this.check = 'checked';
    }
    else {
      this.check = null;
    }
  }

}
