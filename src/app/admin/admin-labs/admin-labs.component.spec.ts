import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLabsComponent } from './admin-labs.component';

describe('AdminLabsComponent', () => {
  let component: AdminLabsComponent;
  let fixture: ComponentFixture<AdminLabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
