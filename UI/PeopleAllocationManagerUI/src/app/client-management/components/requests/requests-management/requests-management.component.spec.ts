import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsManagementComponent } from './requests-management.component';

describe('RequestsManagementComponent', () => {
  let component: RequestsManagementComponent;
  let fixture: ComponentFixture<RequestsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
