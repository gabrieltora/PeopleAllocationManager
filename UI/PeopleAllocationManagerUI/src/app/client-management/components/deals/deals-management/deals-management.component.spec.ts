import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsManagementComponent } from './deals-management.component';

describe('DealsManagementComponent', () => {
  let component: DealsManagementComponent;
  let fixture: ComponentFixture<DealsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
