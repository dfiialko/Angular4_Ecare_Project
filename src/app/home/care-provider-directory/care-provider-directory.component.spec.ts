import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareProviderDirectoryComponent } from './care-provider-directory.component';

describe('CareProviderDirectoryComponent', () => {
  let component: CareProviderDirectoryComponent;
  let fixture: ComponentFixture<CareProviderDirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareProviderDirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareProviderDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
