import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilModalComponent } from './util-modal.component';

describe('UtilModalComponent', () => {
  let component: UtilModalComponent;
  let fixture: ComponentFixture<UtilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
