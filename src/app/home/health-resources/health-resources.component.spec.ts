import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthResourcesComponent } from './health-resources.component';

describe('HealthResourcesComponent', () => {
  let component: HealthResourcesComponent;
  let fixture: ComponentFixture<HealthResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
