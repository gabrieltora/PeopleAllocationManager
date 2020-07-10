import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyRateComponent } from './vacancy-rate.component';

describe('VacancyRateComponent', () => {
  let component: VacancyRateComponent;
  let fixture: ComponentFixture<VacancyRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
