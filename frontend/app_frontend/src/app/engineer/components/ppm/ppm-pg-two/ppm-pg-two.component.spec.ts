import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpmPgTwoComponent } from './ppm-pg-two.component';

describe('PpmPgTwoComponent', () => {
  let component: PpmPgTwoComponent;
  let fixture: ComponentFixture<PpmPgTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpmPgTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpmPgTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
