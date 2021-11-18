import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWidgetComponent } from './admin-widget.component';

describe('AdminWidgetComponent', () => {
  let component: AdminWidgetComponent;
  let fixture: ComponentFixture<AdminWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
