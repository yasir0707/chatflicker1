import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmingraphComponent } from './admingraph.component';

describe('AdmingraphComponent', () => {
  let component: AdmingraphComponent;
  let fixture: ComponentFixture<AdmingraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmingraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmingraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
