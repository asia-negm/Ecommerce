import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class CartService {
  private _HttpClient=inject(HttpClient);


  AddProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v2/cart` , {productId:p_id })
  }
  GetLoggedUserCart():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v2/cart` )
  }
  UpdateCartProductQuantity(p_id:string , count:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v2/cart/${p_id}`,{"count":count} )
  }
  RemoveProductFromCart(p_id:string):Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v2/cart/${p_id}` )
  }
  ClearUserCart():Observable<any>{
    return this._HttpClient.delete(`${environment.baseURL}/api/v2/cart/` )
  }
  ApplyCouponToCart(coupon:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v2/cart/applyCoupon` , {"couponName":coupon})
  }

}
