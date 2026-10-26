import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";
import { LoggedUser } from '../../models/logged-user.IloggedUser';


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
    private _CookieService = inject(CookieService);



  isLogging = signal<boolean>(false);
  userOnfo = signal<LoggedUser>( {} as LoggedUser)

  signUp(formData: SignUpData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup` , formData)
  }

  signIn(formData: SignInData):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin` , formData)
  }

  decodeToken(){
 if(this._CookieService.get('userToken')){
 this.userOnfo.set(jwtDecode(this._CookieService.get('userToken')))
 }
  }
}
