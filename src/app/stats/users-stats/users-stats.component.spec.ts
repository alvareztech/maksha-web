import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStatsComponent } from './users-stats.component';

describe('UsersStatsComponent', () => {
  let component: UsersStatsComponent;
  let fixture: ComponentFixture<UsersStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
