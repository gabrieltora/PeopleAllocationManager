import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsManagementComponent } from './functions-management.component';

describe('FunctionsManagementComponent', () => {
  let component: FunctionsManagementComponent;
  let fixture: ComponentFixture<FunctionsManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionsManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
