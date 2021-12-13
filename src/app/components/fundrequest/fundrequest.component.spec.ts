import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundrequestComponent } from './fundrequest.component';

describe('FundrequestComponent', () => {
  let component: FundrequestComponent;
  let fixture: ComponentFixture<FundrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
