import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabListComponent } from './lab-list.component';

describe('LabListComponent', () => {
  let component: LabListComponent;
  let fixture: ComponentFixture<LabListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
