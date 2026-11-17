import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { Ibrands } from '../../models/IBrands/ibrands.interface';
import { environment } from '../../../../environments/environment.development';

@Service()
export class BrandsService {
  private _HttpClient =inject(HttpClient);

  GetAllBrands():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/brands`)
  }
}
