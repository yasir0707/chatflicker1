import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTriggerComponent } from './admin-trigger.component';

describe('AdminTriggerComponent', () => {
  let component: AdminTriggerComponent;
  let fixture: ComponentFixture<AdminTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTriggerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
