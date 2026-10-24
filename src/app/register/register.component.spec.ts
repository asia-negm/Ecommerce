import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { environment } from '../../environments/environment.development';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let http: HttpTestingController;
  const validForm = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'Password123!',
    rePassword: 'Password123!',
    phone: '01012345678',
  };
  const signUpUrl = `${environment.baseURL}/api/v1/auth/signup`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    http.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('marks an invalid form as touched without submitting', () => {
    component.register();

    expect(component.registerForm.invalid).toBe(true);
    expect(Object.values(component.registerForm.controls).every(control => control.touched)).toBe(true);
    http.expectNone(signUpUrl);
  });

  it('rejects mismatched passwords and clears the error when corrected', () => {
    component.registerForm.setValue({ ...validForm, rePassword: 'Different123' });
    component.register();

    expect(component.registerForm.hasError('missmatch')).toBe(true);
    http.expectNone(signUpUrl);

    component.registerForm.controls['rePassword'].setValue(validForm.password);
    expect(component.registerForm.valid).toBe(true);
  });

  it('posts the form once and navigates to login on success', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.registerForm.setValue(validForm);

    component.register();
    component.register();

    expect(component.isLoading()).toBe(true);
    const request = http.expectOne(signUpUrl);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(validForm);
    request.flush({ message: 'success' });

    expect(component.isLoading()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/login']);
  });

  it('shows the server error and allows a retry', () => {
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.registerForm.setValue(validForm);
    component.register();
    http.expectOne(signUpUrl).flush(
      { message: 'Account already exists' },
      { status: 409, statusText: 'Conflict' },
    );

    expect(component.isLoading()).toBe(false);
    expect(component.resMassage()).toBe('Account already exists');

    component.register();
    expect(component.resMassage()).toBe('');
    http.expectOne(signUpUrl).flush({ message: 'success' });
  });
});
