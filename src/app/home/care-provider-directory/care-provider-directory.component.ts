import { PaginationServiceService } from './../../pagination-service.service';
import { Users } from './users.model';
import { DataService } from './../../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-care-provider-directory',
  templateUrl: './care-provider-directory.component.html',
  styleUrls: ['./care-provider-directory.component.css'],
  providers:[PaginationServiceService]
})
export class CareProviderDirectoryComponent implements OnInit {

  constructor(private _dataService: DataService, private pagination:PaginationServiceService) { }

  users: Array<Users> = [];

  ngOnInit() {

  this._dataService.getUsers().subscribe(data=>this.users = data);

   console.log(this.users + ' users from provider');
  }
}
