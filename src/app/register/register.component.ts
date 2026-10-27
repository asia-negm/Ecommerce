import { Component, signal } from '@angular/core';
import {AbstractControl, FormControl,FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../core/services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  // private _ToastrService= inject(ToastrService)
  resMassage = signal('');
  isLoading = signal(false);
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(/^[A-Z][a-z]{2,}(?:\s[A-Z][a-z]{2,}){0,3}$/),
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/),
    ]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  }, { validators: this.comfirmPassword });
  comfirmPassword(g: AbstractControl) {
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    return password !== rePassword ? { missmatch: true } : null;
  }
  register(): void {
    if (this.isLoading()) return;
    this.resMassage.set('');
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.isLoading.set(true);
    this._AuthService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.message === 'success') {
          void this._Router.navigate(['/login']);
          // this._ToastrService.er
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.resMassage.set(err.error?.message || 'Unable to register. Please try again.');
      },
    });
  }
}
