import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class AuthService {
  private _HttpClient= inject(HttpClient);

  signUp():Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , FormData)
  }

  signIn():Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signIn` , FormData)
  }
}
