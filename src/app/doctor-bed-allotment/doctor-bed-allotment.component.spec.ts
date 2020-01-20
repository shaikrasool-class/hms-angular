import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBedAllotmentComponent } from './doctor-bed-allotment.component';

describe('DoctorBedAllotmentComponent', () => {
  let component: DoctorBedAllotmentComponent;
  let fixture: ComponentFixture<DoctorBedAllotmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorBedAllotmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorBedAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
