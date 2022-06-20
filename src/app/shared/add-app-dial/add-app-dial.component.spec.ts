import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppDialComponent } from './add-app-dial.component';

describe('AddAppDialComponent', () => {
  let component: AddAppDialComponent;
  let fixture: ComponentFixture<AddAppDialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppDialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
