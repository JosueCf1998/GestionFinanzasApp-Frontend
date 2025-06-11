import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeStepOnePage } from './welcome-step-one.page';

describe('WelcomePage', () => {
  let component: WelcomeStepOnePage;
  let fixture: ComponentFixture<WelcomeStepOnePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeStepOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
