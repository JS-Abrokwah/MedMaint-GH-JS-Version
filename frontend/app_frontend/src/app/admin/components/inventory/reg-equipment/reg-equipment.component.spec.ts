import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEquipmentComponent } from './reg-equipment.component';

describe('RegEquipmentComponent', () => {
  let component: RegEquipmentComponent;
  let fixture: ComponentFixture<RegEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
