import { DataService } from './../../data.service';
import { Observable } from 'rxjs/Observable';
import { User } from './../patients/update-patients/update-patients.component';

import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-provider-directory',
  templateUrl: './care-provider-directory.component.html',
  styleUrls: ['./care-provider-directory.component.css']
})
export class CareProviderDirectoryComponent implements OnInit {
  users: User[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }
  showUsers(){
   this.dataService.getAllUsers().subscribe(data=> this.users = data);
  }

}
