import { HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MissaoService } from '../services/missao.service';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private authService = inject(AuthService);
//   private missaoService = inject(MissaoService);

//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const cloneReq = this.getRequestWithUpdatedToken(req);

//     return next.handle(cloneReq).pipe(
//       catchError((error) => {
//         if (error.status !== 401) {
//           return throwError(() => error);
//         }

//         // Caso for 401
//         return this.missaoService.refreshToken().pipe(
//           tap((rtResponse) =>
//             this.authService.setAuthTokens(
//               rtResponse.token,
//               rtResponse.refreshToken
//             )
//           ),
//           switchMap(() => next.handle(this.getRequestWithUpdatedToken(req)))
//         );
//       })
//     );
//   }
// }

export const AuthInterceptorFuncao: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const missaoService = inject(MissaoService);

    const cloneReq = getRequestWithUpdatedToken(req, authService);

    return next(cloneReq).pipe(
        catchError((error) => {
          if (error.status !== 401) {
            return throwError(() => error);
          }
  
          // Caso for 401
          return missaoService.refreshToken().pipe(
            tap((rtResponse) =>
              authService.setAuthTokens(
                rtResponse.token,
                rtResponse.refreshToken
              )
            ),
            switchMap(() => next(getRequestWithUpdatedToken(req, authService)))
          );
        })
      );;
};

const getRequestWithUpdatedToken = (req: HttpRequest<any>, authService: AuthService) => {
    const token = authService.getToken();
    if (!token) return req;

    const headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);
    return req.clone({
      headers,
    });
}