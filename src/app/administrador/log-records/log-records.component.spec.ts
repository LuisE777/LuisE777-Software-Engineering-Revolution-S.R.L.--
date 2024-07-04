import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRecordsComponent } from './log-records.component';

describe('LogRecordsComponent', () => {
  let component: LogRecordsComponent;
  let fixture: ComponentFixture<LogRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
