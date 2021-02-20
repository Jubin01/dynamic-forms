import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupCallerComponent } from './lookup-caller.component';

describe('LookupCallerComponent', () => {
  let component: LookupCallerComponent;
  let fixture: ComponentFixture<LookupCallerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupCallerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupCallerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
