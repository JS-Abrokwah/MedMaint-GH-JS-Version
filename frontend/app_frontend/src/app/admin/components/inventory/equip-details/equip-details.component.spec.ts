import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipDetailsComponent } from './equip-details.component';

describe('EquipDetailsComponent', () => {
  let component: EquipDetailsComponent;
  let fixture: ComponentFixture<EquipDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
