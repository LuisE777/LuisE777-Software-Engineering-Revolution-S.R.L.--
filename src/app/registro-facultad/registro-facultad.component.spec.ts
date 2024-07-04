import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroFacultadComponent } from './registro-facultad.component';

describe('RegistroFacultadComponent', () => {
  let component: RegistroFacultadComponent;
  let fixture: ComponentFixture<RegistroFacultadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroFacultadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroFacultadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
