import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headrInterceptor: HttpInterceptorFn = (req, next) => {
  let _PLATFORM_ID= inject(PLATFORM_ID);
  let _CookieService= inject(CookieService);
  if(isPlatformBrowser(_PLATFORM_ID)){
    if(_CookieService.check('userToken')){
      if(req.url.includes('cart') ||req.url.includes('wishlist') ||req.url.includes('users') ||req.url.includes('addersses')){
        req = req.clone({
          setHeaders:{token:_CookieService.get('userToken')}
        })


      }
    }
  }
  return next(req);

};
