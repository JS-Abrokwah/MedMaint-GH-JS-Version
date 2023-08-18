import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueppmComponent } from './dueppm.component';

describe('DueppmComponent', () => {
  let component: DueppmComponent;
  let fixture: ComponentFixture<DueppmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueppmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueppmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
