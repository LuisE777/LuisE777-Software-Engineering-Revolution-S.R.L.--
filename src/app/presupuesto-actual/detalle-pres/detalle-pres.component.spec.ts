import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePresComponent } from './detalle-pres.component';

describe('DetallePresComponent', () => {
  let component: DetallePresComponent;
  let fixture: ComponentFixture<DetallePresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
