import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem('accessToken');
  const reqClone = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
  })
  return next(reqClone);
};
