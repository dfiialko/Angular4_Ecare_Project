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
  { email: 'verylongemailgoAwasdassdsadsaike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: 'goAwayMike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'female' },
  { email: 'peter@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: 'peter@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '2@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '2@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '2@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'female' },
  { email: '2@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '2@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '3@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '3emailgoAwayMike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '3ayMike@gaied.com', name: 'Mike Ooe', birth: '09/09/1990', phone: '2042242828', gender: 'female' },
  { email: '3r@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '3er@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' },
  { email: '3er@gaied.com', name: 'Peter Gaied', birth: '09/09/1990', phone: '2042242828', gender: 'male' }];

  constructor(private _dataService: DataService, private location: PlatformLocation, router: Router) {
    // Access the Data Service's getUsers() method we defined
    // this._dataService.getUsers().subscribe(res => this.users = res);

    location.onPopState(() => { this.page = 'patients'; });
  }

  ngOnInit() {
    this.page = 'patients';
    // this._dataService.getUsers().subscAribe(res => this.users = res);
  }

  // Will get certain user according to the value passed
  getUser(passedUserValue) {
    this.page = 'updatePatients';
    this.patient = passedUserValue;
 
  }
  // Use dataservice method to delete user profile
  deleteUser(userID) {
    this._dataService.deleteUser(userID).subscribe();
    // this._dataService.getUsers().subscribe(res => this.users = res);
  }
  changePage(pageName) {
    this.page = pageName.pagename;
  }
  // ************* Pagination ***************//
  // Later move this to separate service for re-use
  previousClickPagination() {
    if (this.fromIndex >= 5) {
      this.fromIndex -= 5;
      this.toIndex -= 5;
    }
  }
  nextClickPagination() {
    if (this.users.length >= this.toIndex) {
      this.fromIndex += 5;
      this.toIndex += 5;
    }
  }
  paginationDisplayNext(number) {
    if (number > 1) {
    this.fromIndex =  (number - 1) * 5;
    this.toIndex = number * 5;
    }else {
      this.fromIndex = 0;
      this.toIndex = 5;
    }
  }
// ***********--------****************//
}
