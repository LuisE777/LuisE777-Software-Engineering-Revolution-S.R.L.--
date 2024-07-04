import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizandoComponent } from './cotizando.component';

describe('CotizandoComponent', () => {
  let component: CotizandoComponent;
  let fixture: ComponentFixture<CotizandoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CotizandoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizandoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
