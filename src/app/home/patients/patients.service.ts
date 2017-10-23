import { Patient } from './patientModel/patient.model';
import { RequestOptions, Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class PatientsService {
patient =[];
constructor(private http: Http) { }
// Gets all patients from database
getAllPatients() {
    const authToken = localStorage.getItem('auth_token');
    const headers = new Headers({ 'Authorization': 'Bearer ' + authToken });
    const options = new RequestOptions({ headers: headers });
    const obs = this.http.get('http://208.75.74.123:10020/api/users', options).map((response: Response) => response.json());
    obs.subscribe(val => this.patient.push(val));
    return this.patient;
}
}