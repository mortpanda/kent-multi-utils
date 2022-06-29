import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WipItemComponent } from './wip-item.component';

describe('WipItemComponent', () => {
  let component: WipItemComponent;
  let fixture: ComponentFixture<WipItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WipItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WipItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
