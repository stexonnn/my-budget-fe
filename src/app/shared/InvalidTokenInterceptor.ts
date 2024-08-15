import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, Observable, throwError } from "rxjs";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private userService: UserService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 403 || error.status === 401) {
          this.userService.logOut();
          this.router.navigate(['/account']);
        }
        return throwError(error);
      })
    );
  }
}