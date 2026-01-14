import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // get the token from local storage.
  const token = localStorage.getItem('auth_token');

  // لو request بتاع login/register مش محتاج token
  if (req.url.includes('/api/Auth/login')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req);
};
