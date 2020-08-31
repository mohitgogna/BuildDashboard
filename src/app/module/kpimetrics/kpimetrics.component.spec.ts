import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpimetricsComponent } from './kpimetrics.component';

describe('KpimetricsComponent', () => {
  let component: KpimetricsComponent;
  let fixture: ComponentFixture<KpimetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpimetricsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpimetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
