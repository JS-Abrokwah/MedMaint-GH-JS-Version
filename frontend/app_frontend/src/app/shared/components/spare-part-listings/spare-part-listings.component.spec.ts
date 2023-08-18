import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparePartListingsComponent } from './spare-part-listings.component';

describe('SparePartListingsComponent', () => {
  let component: SparePartListingsComponent;
  let fixture: ComponentFixture<SparePartListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparePartListingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SparePartListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
