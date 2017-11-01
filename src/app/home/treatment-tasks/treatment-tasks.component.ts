import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-treatment-tasks',
  templateUrl: './treatment-tasks.component.html',
  styleUrls: ['./treatment-tasks.component.css']
})
export class TreatmentTasksComponent implements OnInit {
  constructor() { }
  task = 'medication';
  ngOnInit() {
  }
  setTask(task)
  {
    this.task = task;
  }
}