import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeCotizadoComponent } from './informe-cotizado.component';

describe('InformeCotizadoComponent', () => {
  let component: InformeCotizadoComponent;
  let fixture: ComponentFixture<InformeCotizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformeCotizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeCotizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
