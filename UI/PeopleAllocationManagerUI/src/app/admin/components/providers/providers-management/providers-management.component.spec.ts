import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersManagementComponent } from './providers-management.component';

describe('ProvidersManagementComponent', () => {
  let component: ProvidersManagementComponent;
  let fixture: ComponentFixture<ProvidersManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
