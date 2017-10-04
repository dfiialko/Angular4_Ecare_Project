import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PlatformLocation } from '@angular/common'
import { Patient } from './patientModel/patient.model';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  @Output() signInEmitterPatient = new EventEmitter<any>();
  pageIndex = 0;
  fromIndex = 0;
  toIndex = 5;
  page;
  patient: Patient;
  // users: Array<any>[] = [];

  users: Array<Patient> = [{ email: 'peter@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: 'verylongemailgoAwayMike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: 'goAwayMike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'female' },
  { email: 'peter@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: 'peter@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' }];

  constructor(private _dataService: DataService, private location: PlatformLocation, router: Router) {
    // Access the Data Service's getUsers() method we defined
    // this._dataService.getUsers().subscribe(res => this.users = res);

    location.onPopState(() => { this.page = 'patients'; });
  }

  ngOnInit() {
    this.page = 'patients';
    // this._dataService.getUsers().subscAribe(res => this.users = res);
  }

  getUser(passedUserValue) {
    console.log(passedUserValue);
    this.page = 'updatePatients';
    this.patient = passedUserValue;
  }
  deleteUser(userID) {
    this._dataService.deleteUser(userID).subscribe();
    // this._dataService.getUsers().subscribe(res => this.users = res);
  }
  changePage(pageName) {
    this.page = pageName.pagename;
  }
}
