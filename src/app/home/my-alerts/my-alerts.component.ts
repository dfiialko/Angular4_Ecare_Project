import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-alerts',
  templateUrl: './my-alerts.component.html',
  styleUrls: ['./my-alerts.component.css']
})
export class MyAlertsComponent implements OnInit {

  constructor() { }

  previousColor;

  patientAlert = [
    {name:'Risa P.Valentine', dateReceived:'2015-03-10', alert:'Missed Dose', status:'New', sendMessage:'Write'},
    {name:'Ocrean Fulton', dateReceived:'2015-01-11', alert:'Blood Pressure High', status:'High Risk', sendMessage:'Write'},
    {name:'Macon Moore', dateReceived:'2015-04-16', alert:'Missed Dose', status:'Completed', sendMessage:'Write'},
    {name:'Meredith Hobbs', dateReceived:'2015-02-02', alert:'Cholesterol High', status:'High Risk', sendMessage:'Write'}
  ];

  ngOnInit() {
  }

}
