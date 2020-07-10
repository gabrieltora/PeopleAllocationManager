import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocationRateComponent } from './allocation-rate.component';

describe('AllocationRateComponent', () => {
  let component: AllocationRateComponent;
  let fixture: ComponentFixture<AllocationRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocationRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocationRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
