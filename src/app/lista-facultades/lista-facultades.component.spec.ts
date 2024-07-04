import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFacultadesComponent } from './lista-facultades.component';

describe('ListaFacultadesComponent', () => {
  let component: ListaFacultadesComponent;
  let fixture: ComponentFixture<ListaFacultadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFacultadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFacultadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
