import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccioneAnioComponent } from './seleccione-anio.component';

describe('SeleccioneAnioComponent', () => {
  let component: SeleccioneAnioComponent;
  let fixture: ComponentFixture<SeleccioneAnioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccioneAnioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccioneAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
