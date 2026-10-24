import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface SignInData {
  email: string;
  password: string;
}

@Service()
export class AuthService {
  private _HttpClient= inject(HttpClient);

  signUp(formData: SignUpData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , formData)
  }

  signIn(formData: SignInData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` , formData)
  }
}
