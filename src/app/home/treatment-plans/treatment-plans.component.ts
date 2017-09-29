import { Component, OnInit, ViewChild, ViewChildren, ElementRef, Renderer } from '@angular/core';

@Component({
 selector: 'app-treatment-plans',
 templateUrl: './treatment-plans.component.html',
 styleUrls: ['./treatment-plans.component.css']
})
export class TreatmentPlansComponent implements OnInit {
check = null;
 plans: Array<any> = [{
   treatmentPlan: 'Type 1 Diabetes', dateCreated: '2015-03-01 10:30AM',
   createdBy: 'Nurse Fiona Galaghar', totalPatientsEnrolled: '20'
 },
 {
   treatmentPlan: 'Hypertension', dateCreated: '2015-03-01 9:30AM',
   createdBy: 'Nurse Kate Von Darly', totalPatientsEnrolled: '50'
 },
 {
   treatmentPlan: 'Weight Loss', dateCreated: '2015-03-05 13:30PM',
   createdBy: 'Dr.Karthik', totalPatientsEnrolled: '150'
 }];

 @ViewChild ('focusButton') focusButton:ElementRef;

 constructor(private rendered:Renderer) { }
 menuButton="VIEW BY TREATMENT GROUP";
 categories=['ARTHRITIS','DIABITIES','COPD','CORONARY HEART FAILURE'];
 changeCategory(categoryName){
   this.menuButton = categoryName;
 }
 displayAll(){
   this.menuButton = 'VIEW BY TREATMENT GROUP';
   // Display all records
 }

 ngAfterViewInit() {
   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
   //Add 'implements AfterViewInit' to the class.
   this.rendered.invokeElementMethod(this.focusButton,'focus');
 }
 checkAll() {
  if (this.check === null) {
    this.check = 'checked';
  }
  else {
    this.check = null;
  }
}
 ngOnInit() {
 }

}