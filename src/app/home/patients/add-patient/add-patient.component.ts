import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { Patient } from '../patientModel/patient.model';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  @ViewChild('emailInput') emailInputRef: ElementRef;
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('birthInput') birthInputRef: ElementRef;
  @ViewChild('phoneInput') phoneInputRef: ElementRef;

  @Input() signInUserName;

  ngOnInit() { }

  //Adding new patient when clicked
  addPatient() {

    var data = [ 
      {
        "name": this.emailInputRef.nativeElement.value,
        "email": this.nameInputRef.nativeElement.value,
        "birth": this.birthInputRef.nativeElement.value,
        "phonenumber": this.phoneInputRef.nativeElement.value
      }
    ];

    //  this._dataService.addUser(data).subscribe();
  }

}