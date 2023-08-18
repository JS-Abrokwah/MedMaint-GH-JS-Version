import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEDashboardComponent } from './a-e-dashboard.component';

describe('AEDashboardComponent', () => {
  let component: AEDashboardComponent;
  let fixture: ComponentFixture<AEDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AEDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AEDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
