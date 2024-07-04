import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPresupuestoComponent } from './registro-presupuesto.component';

describe('RegistroPresupuestoComponent', () => {
  let component: RegistroPresupuestoComponent;
  let fixture: ComponentFixture<RegistroPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroPresupuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
