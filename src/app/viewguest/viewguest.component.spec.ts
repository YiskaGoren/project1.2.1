import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewguestComponent } from './viewguest.component';

describe('ViewguestComponent', () => {
  let component: ViewguestComponent;
  let fixture: ComponentFixture<ViewguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
