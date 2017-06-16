import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesComponent } from './admin-articles.component';

describe('AdminArticlesComponent', () => {
  let component: AdminArticlesComponent;
  let fixture: ComponentFixture<AdminArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
