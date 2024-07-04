import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolusuarioComponent } from './rolusuario.component';

describe('RolusuarioComponent', () => {
  let component: RolusuarioComponent;
  let fixture: ComponentFixture<RolusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
