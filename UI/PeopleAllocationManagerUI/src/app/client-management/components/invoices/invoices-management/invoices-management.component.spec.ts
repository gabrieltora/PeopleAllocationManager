import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesManagementComponent } from './invoices-management.component';

describe('InvoicesManagementComponent', () => {
  let component: InvoicesManagementComponent;
  let fixture: ComponentFixture<InvoicesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
