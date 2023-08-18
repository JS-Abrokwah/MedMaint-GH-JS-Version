import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsRendererComponent } from './tabs-renderer.component';

describe('TabsRendererComponent', () => {
  let component: TabsRendererComponent;
  let fixture: ComponentFixture<TabsRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
