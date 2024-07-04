import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEmpresaComponent } from './seleccion-empresa.component';

describe('SeleccionEmpresaComponent', () => {
  let component: SeleccionEmpresaComponent;
  let fixture: ComponentFixture<SeleccionEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
