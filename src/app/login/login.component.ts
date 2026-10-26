import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../core/services/Auth/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _CookieService: CookieService,
  ) {}

  resMassage = signal('');
  isLoading = signal(false);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  login(): void {
    if (this.isLoading()) return;

    this.resMassage.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this._AuthService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        this._AuthService.isLogging.set(true)
        this.isLoading.set(false);
        if (res.message === 'success' && res.token) {
          this._CookieService.set('token', res.token, { path: '/', sameSite: 'Lax' });
          void this._Router.navigate(['/home']);
        } else {
          this.resMassage.set('Unable to sign in. Please try again.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.resMassage.set(err.error?.message || 'Unable to sign in. Please try again.');
      },
    });
  }
}
