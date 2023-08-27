import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public router: Router,
    private snackbar: MatSnackBar,
    private loaderService: LoaderService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const coreToken = sessionStorage.getItem('token');
    this.loaderService.emitChange(true);

    const timezone = 'Africa/Lagos'; // Set the desired timezone here

    if (coreToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${coreToken}`,
          'X-Timezone': timezone, // Include the timezone in the header
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            const { error } = err.error;
            this.snackbar.open(`${error}`, '', {
              duration: 4000,
              panelClass: ['error'],
            });
            console.log(err);
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user_type');

            if (this.router.url != '/forgot-password') {
              this.router.navigate(['login']);
            }
          }

          console.log(err);
          if (err.error.message) {
            if (err.error.message.includes('foreign')) {
              this.snackbar.open(
                `Item is connected to other table, delete connected data first`,
                '',
                {
                  duration: 4000,
                  panelClass: ['error'],
                }
              );
            } else {
              this.snackbar.open(`${err.error.message}`, '', {
                duration: 4000,
                panelClass: ['error'],
              });
            }

            setTimeout(() => {
              this.loaderService.emitChange(false);
            }, 1000);

            return throwError(() => new Error(`${err.error.message}`));
          }
          setTimeout(() => {
            this.loaderService.emitChange(false);
          }, 1000);
        }
        return throwError(() => new Error('It is our fault..'));
      })
    );
  }
}
