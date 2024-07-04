import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaPresupuestoComponent } from './fecha-presupuesto.component';

describe('FechaPresupuestoComponent', () => {
  let component: FechaPresupuestoComponent;
  let fixture: ComponentFixture<FechaPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaPresupuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
