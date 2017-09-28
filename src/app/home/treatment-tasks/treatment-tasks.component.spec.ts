import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTasksComponent } from './treatment-tasks.component';

describe('TreatmentTasksComponent', () => {
  let component: TreatmentTasksComponent;
  let fixture: ComponentFixture<TreatmentTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
