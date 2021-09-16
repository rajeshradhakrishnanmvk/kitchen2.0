import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;
    //"http://localhost:8081/auth/login
    //curl -X POST "http://localhost:8081/auth/login" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"userId\":\"ram\",\"password\":\"123456\",\"firstName\":\"rajesh\",\"lastName\":\"radhakrishnan\",\"role\":\"admin\",\"addedDate\":\"2021-09-15T13:34:47.370Z\"}"
    //curl -X POST "http://localhost:8081/auth/register" -H  "accept: */*" -H  "Content-Type: application/json" -d "{\"userId\":\"ram\",\"password\":\"123456\",\"firstName\":\"rajesh\",\"lastName\":\"radhakrishnan\",\"role\":\"admin\",\"addedDate\":\"2021-09-15T13:34:47.370Z\"}"
    constructor(private http: HttpClient,
        private router: Router) { }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8081/auth/register', {
            userId: email,
            password: password,
            email: email,
            firstName: "Test",
            lastName: "User",
            role: "Admin",
            addedDate: new Date()

        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('http://localhost:8081/auth/login', {
            userId: email,
            password: password,
            email: email,
            firstName: "Test",
            lastName: "User",
            role: "Admin",
            addedDate: new Date()
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            })
        );

    }

    logout() {
        this.user.next(null);
        this.router.navigate(['./auth']);
        localStorage.removeItem['userData'];
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }


    private handleAuthentication(email: string, userId: string, token: string, expiration: number) {
        const expirationDate = new Date(new Date().getTime() + expiration * 1000);
        const user = new User(email, userId, token, expirationDate)
        this.user.next(user);
        this.autoLogout(expiration * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    autoLogin() {
        const userData: {
            email: string
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getDate() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        //console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An error occured!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email exists already!";
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email doesn't exists!";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Invalid password!"
        }
        return throwError(errorMessage);
    }
}