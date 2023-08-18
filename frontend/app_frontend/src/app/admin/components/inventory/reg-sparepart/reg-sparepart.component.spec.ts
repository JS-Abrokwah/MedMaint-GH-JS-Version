import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSparepartComponent } from './reg-sparepart.component';

describe('RegSparepartComponent', () => {
  let component: RegSparepartComponent;
  let fixture: ComponentFixture<RegSparepartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegSparepartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegSparepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
