import { LogInComponent } from './log-in/log-in.component';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  private token;
  
  constructor(private _http: Http,) { }

  // addUser(data)
  // {
  //   console.log("data.service.ts");
  //   return this._http.post('http://localhost:10020/api/addUser',data).map(res=>res.json());
  // }

  setToken(token)
  {
    this.token = token;
  }

  deleteUser(userID) {
    console.log('deleting user');
    console.log(userID);
    return this._http.delete('http://208.75.74.123:10020/api/deleteUser/' + userID).map(res => res.json());
  }


  logIn(userInfo) {
    console.log('logging in');
    return this._http.post('http://208.75.74.123:10020/api/oauth/token', userInfo).map(res => res.json());
  }


  getUsers(){
    console.log(this.result);
    let headers = new Headers({'Authorization' : 'Bearer '+ localStorage.getItem('auth_token')});
    let options = new RequestOptions({headers:headers});
    return this._http.get('http://208.75.74.123:10020/api/users', options)
      .map((response: Response)=> response.json());
  }

}