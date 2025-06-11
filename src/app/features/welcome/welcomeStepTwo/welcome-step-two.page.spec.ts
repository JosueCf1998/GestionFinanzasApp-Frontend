import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeStepTwoPage } from './welcome-step-two.page';

describe('WelcomePage', () => {
  let component: WelcomeStepTwoPage;
  let fixture: ComponentFixture<WelcomeStepTwoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeStepTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
