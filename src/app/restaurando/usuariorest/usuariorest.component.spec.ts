import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariorestComponent } from './usuariorest.component';

describe('UsuariorestComponent', () => {
  let component: UsuariorestComponent;
  let fixture: ComponentFixture<UsuariorestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariorestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariorestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
