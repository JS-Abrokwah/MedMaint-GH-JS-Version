import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegClinicianComponent } from './reg-clinician.component';

describe('RegClinicianComponent', () => {
  let component: RegClinicianComponent;
  let fixture: ComponentFixture<RegClinicianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegClinicianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegClinicianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
