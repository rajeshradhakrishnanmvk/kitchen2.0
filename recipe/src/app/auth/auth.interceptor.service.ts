import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthInteceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {
        console.log('Auth Service is called');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                // const modifiedReq = req.clone(
                //     {
                //         params: new HttpParams().set('Bearer', user.token)
                //     });
                //return next.handle(modifiedReq);
                const headers = req.headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${user.token}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq);
            })
        )

    }
}