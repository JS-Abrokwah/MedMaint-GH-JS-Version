import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliMaintenanceComponent } from './cli-maintenance.component';

describe('CliMaintenanceComponent', () => {
  let component: CliMaintenanceComponent;
  let fixture: ComponentFixture<CliMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
