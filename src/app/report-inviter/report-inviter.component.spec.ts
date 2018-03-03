import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportInviterComponent } from './report-inviter.component';

describe('ReportInviterComponent', () => {
  let component: ReportInviterComponent;
  let fixture: ComponentFixture<ReportInviterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportInviterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportInviterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
