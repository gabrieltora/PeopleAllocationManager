import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsReportComponent } from './deals-report.component';

describe('DealsReportComponent', () => {
  let component: DealsReportComponent;
  let fixture: ComponentFixture<DealsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
