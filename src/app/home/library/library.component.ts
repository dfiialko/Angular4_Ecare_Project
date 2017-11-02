import { Component, OnInit, ElementRef, Renderer, ViewChild } from '@angular/core';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  @ViewChild('focusButton') focusButton: ElementRef;

  constructor(private rendered: Renderer) { }
  menuButton = 'VIEW BY CATEGORY';
  categories = ['HYPERTENSION'];
  cards = ['taking_your_blood_pressure', 'taking_your_blood_pressure3',
  'taking_your_blood_pressure2', 'high_blood_pressure', 'taking_your_blood_pressure2', 
  'high_blood_pressure'];
  // cards = ['taking_your_blood_pressure'];
  changeCategory(categoryName) {
    this.menuButton = categoryName;
  }
  displayAll() {
    this.menuButton = 'VIEW BY CATEGORY';
    // Display all records
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.rendered.invokeElementMethod(this.focusButton, 'focus');
  }
  ngOnInit() {

  }

}
