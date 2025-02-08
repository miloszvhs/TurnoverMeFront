import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitpathCreateComponent } from './circuitpath-create.component';

describe('CircuitpathCreateComponent', () => {
  let component: CircuitpathCreateComponent;
  let fixture: ComponentFixture<CircuitpathCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircuitpathCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CircuitpathCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
