import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliPersonnelComponent } from './cli-personnel.component';

describe('CliPersonnelComponent', () => {
  let component: CliPersonnelComponent;
  let fixture: ComponentFixture<CliPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CliPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CliPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
