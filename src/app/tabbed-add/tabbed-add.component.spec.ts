import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedAddComponent } from './tabbed-add.component';

describe('TabbedAddComponent', () => {
  let component: TabbedAddComponent;
  let fixture: ComponentFixture<TabbedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabbedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
