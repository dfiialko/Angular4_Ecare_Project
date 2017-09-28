import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() 
  {
    console.log(this.result);
    return this._http.get("http://208.75.74.123:10020/api/getUser")
    .map(result => this.result = result.json().data);
      
  }

  // addUser(data)
  // {
  //   console.log("data.service.ts");
  //   return this._http.post('http://208.75.74.123:10020/api/addUser',data).map(res=>res.json());
  // }

  deleteUser(userID)
  {
    console.log('deleting user');
    console.log(userID);
    return this._http.delete('http://208.75.74.123:10020/api/deleteUser/'+ userID).map(res=>res.json());
  }


  logIn(userInfo)
  {
    console.log('logging in');
    return this._http.post('http://208.75.74.123:10020/api/oauth/token', userInfo).map(res=>res.json());
  } 

}