import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeKeepingModalComponent } from './time-keeping-modal.component';

describe('TimeKeepingModalComponent', () => {
  let component: TimeKeepingModalComponent;
  let fixture: ComponentFixture<TimeKeepingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeKeepingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeKeepingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
