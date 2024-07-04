import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvMonedaComponent } from './conv-moneda.component';

describe('ConvMonedaComponent', () => {
  let component: ConvMonedaComponent;
  let fixture: ComponentFixture<ConvMonedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvMonedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
