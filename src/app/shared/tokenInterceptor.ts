import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            if (typeof localStorage !== 'undefined') {
                const token = localStorage.getItem('token');
                if (token) {
                    const cloned = req.clone({
                        headers: req.headers.set('Authorization', `Bearer ${token}`)
                    });
                    return next.handle(cloned);
                }
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        return next.handle(req);
    }
}