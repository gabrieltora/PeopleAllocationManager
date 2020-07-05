import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologiesManagementComponent } from './technologies-management.component';

describe('TechnologiesManagementComponent', () => {
  let component: TechnologiesManagementComponent;
  let fixture: ComponentFixture<TechnologiesManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnologiesManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnologiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
