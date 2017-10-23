import { User } from './home/patients/update-patients/update-patients.component';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  users: User[] = [];
  result: any;
  constructor(private _http: Http) { }

  getAllUsers() {
    const authToken = localStorage.getItem('auth_token');
    console.log(authToken);
    const headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    const options = new RequestOptions({headers: headers});
    console.log('get');
    const obs = this._http.get('http://208.75.74.123:10020/api/users', options).map((response: Response) => response.json());
    return obs;
  }
  // getUsers() {
  //   console.log(this.result);
  //   return this._http.get('http://208.75.74.123:10020/api/getUser')
  //     .map(result => this.result = result.json().data);
  // }
  // addUser(data)
  // {
  //   console.log("data.service.ts");
  //   return this._http.post('http://localhost:10020/api/addUser',data).map(res=>res.json());
  // }

  deleteUser(userID) {
    console.log('deleting user');
    console.log(userID);
    return this._http.delete('http://208.75.74.123:10020/api/deleteUser/' + userID).map(res => res.json());
  }


  logIn(userInfo) {
    console.log('logging in');
    return this._http.post('http://208.75.74.123:10020/api/oauth/token', userInfo).map(res => res.json());
  }

}