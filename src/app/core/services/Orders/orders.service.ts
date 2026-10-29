import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Service()
export class OrdersService {
  private _HttpClient=inject(HttpClient)


  CreateCashOrderFromCart(cartId:string , data:object):Observable<any>{
    return this._HttpClient.post(`${environment}/api/v2/orders/${cartId}` , {'shippingAddress' :data})
  }

CreateCashOrder(data:object):Observable<any>{
  return this._HttpClient.post(`${environment}/api/v1/orders/65cb72e38462ab02c71ee050` , {'shippingAddress' :data})
  }

getAllOrders():Observable<any>{
  return this._HttpClient.get(`${environment}/api/v1/orders/` )
  }

  getUserOrders():Observable<any>{
      return this._HttpClient.get(`${environment}/api/v1/orders/user/6407cf6f515bdcf347c09f17` )
  }

  Checkoutsession(data:object ,cartId:string):Observable<any>{
          return this._HttpClient.post(`${environment}/api/v1/orders/checkout-session/${cartId}?url=${environment.domain}` , {'shippingAddress':data} )

  }


}


