import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailSenderComponent } from './mail-sender.component';

describe('MailSenderComponent', () => {
  let component: MailSenderComponent;
  let fixture: ComponentFixture<MailSenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailSenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailSenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
