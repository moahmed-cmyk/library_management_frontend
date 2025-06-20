import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environments/environment';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
    req=req.clone({

    url: environment.RESTBASEURL+req.url,
  })
  return next(req);
};
