import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipCardComponent } from './equip-card.component';

describe('EquipCardComponent', () => {
  let component: EquipCardComponent;
  let fixture: ComponentFixture<EquipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
