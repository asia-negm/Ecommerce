import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let _ToastrService =inject(ToastrService)

  return next(req).pipe( catchError ( (error) =>{
    _ToastrService.error(error.error.message , 'Freah cart')
    return throwError( ()=> error)
  }));
};
