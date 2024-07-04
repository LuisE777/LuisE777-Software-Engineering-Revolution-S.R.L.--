import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSupPresupuestoComponent } from './item-sup-presupuesto.component';

describe('ItemSupPresupuestoComponent', () => {
  let component: ItemSupPresupuestoComponent;
  let fixture: ComponentFixture<ItemSupPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSupPresupuestoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSupPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
