import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRendererComponent } from './table-renderer.component';

describe('TableRendererComponent', () => {
  let component: TableRendererComponent;
  let fixture: ComponentFixture<TableRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
