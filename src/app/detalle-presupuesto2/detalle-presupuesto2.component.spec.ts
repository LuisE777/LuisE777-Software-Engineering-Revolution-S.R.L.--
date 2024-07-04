import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePresupuesto2Component } from './detalle-presupuesto2.component';

describe('DetallePresupuesto2Component', () => {
  let component: DetallePresupuesto2Component;
  let fixture: ComponentFixture<DetallePresupuesto2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePresupuesto2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePresupuesto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
