import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteItemComponent } from './complete-item.component';

describe('CompleteItemComponent', () => {
  let component: CompleteItemComponent;
  let fixture: ComponentFixture<CompleteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
