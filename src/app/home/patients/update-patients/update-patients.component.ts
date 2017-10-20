import { Patient } from './../patientModel/patient.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-update-patients',
  templateUrl: './update-patients.component.html',
  styleUrls: ['./update-patients.component.css']
})
export class UpdatePatientsComponent implements OnInit {
  @Input() patient;
  @Input() users;
  @Output() navigationBackToPatient = new EventEmitter<{pagename:string}>();
  
  displayedColumns = ['treatmentGroup', 'treatmentPlan', 'dateEnrolled', 'status','dateCompleted'];
  dataSource = new ExampleDataSource();
  constructor() { }

  ngOnInit() {
  }
  changePage(pageName){
    this.navigationBackToPatient.emit({pagename:pageName});
    console.log(pageName + "at updatePAtient");
  }
}
export interface User {
  treatmentPlan: string;
  treatmentGroup: string;
  dateEnrolled: string;
  status: string;
  dateCompleted: string;
}
const data: User[] = [
  {treatmentGroup: 'Diabetes', treatmentPlan: 'Type 2', dateEnrolled: '8/10/1990', status: 'Active',dateCompleted:''},
  {treatmentGroup: 'Hypertension', treatmentPlan: 'Hypertension', dateEnrolled: '8/10/1990', status: 'Active',dateCompleted:''}
];
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    return Observable.of(data)
  }

  disconnect() {}
}
