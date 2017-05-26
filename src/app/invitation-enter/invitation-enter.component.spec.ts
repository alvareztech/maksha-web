import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationEnterComponent } from './invitation-enter.component';

describe('InvitationEnterComponent', () => {
  let component: InvitationEnterComponent;
  let fixture: ComponentFixture<InvitationEnterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvitationEnterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationEnterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
