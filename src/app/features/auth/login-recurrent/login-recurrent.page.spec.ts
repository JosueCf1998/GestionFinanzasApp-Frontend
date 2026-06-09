import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRecurrentPage } from './login-recurrent.page';

describe('LoginRecurrentPage', () => {
  let component: LoginRecurrentPage;
  let fixture: ComponentFixture<LoginRecurrentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRecurrentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
