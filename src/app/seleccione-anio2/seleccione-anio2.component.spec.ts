import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccioneAnio2Component } from './seleccione-anio2.component';

describe('SeleccioneAnio2Component', () => {
  let component: SeleccioneAnio2Component;
  let fixture: ComponentFixture<SeleccioneAnio2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccioneAnio2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccioneAnio2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
