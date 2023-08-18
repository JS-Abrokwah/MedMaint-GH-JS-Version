import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpmPgOneComponent } from './ppm-pg-one.component';

describe('PpmPgOneComponent', () => {
  let component: PpmPgOneComponent;
  let fixture: ComponentFixture<PpmPgOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpmPgOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpmPgOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
