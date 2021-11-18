import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyAgentComponent } from './verify-agent.component';

describe('VerifyAgentComponent', () => {
  let component: VerifyAgentComponent;
  let fixture: ComponentFixture<VerifyAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyAgentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
