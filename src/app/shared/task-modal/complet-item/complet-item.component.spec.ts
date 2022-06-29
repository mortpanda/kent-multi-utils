import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletItemComponent } from './complet-item.component';

describe('CompletItemComponent', () => {
  let component: CompletItemComponent;
  let fixture: ComponentFixture<CompletItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
