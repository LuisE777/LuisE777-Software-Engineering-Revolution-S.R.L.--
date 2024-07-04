import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecEmpresaComponent } from './selec-empresa.component';

describe('SelecEmpresaComponent', () => {
  let component: SelecEmpresaComponent;
  let fixture: ComponentFixture<SelecEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelecEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelecEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
