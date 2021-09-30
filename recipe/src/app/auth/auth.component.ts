import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from "../shared/placeholder/placeholderdirective.component";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {

    }
    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let autObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            autObs = this.authService.login(email, password);

        } else {
            autObs = this.authService.signup(email, password);
        }
        autObs.subscribe(
            resData => {
                //console.log(resData);
                this.isLoading = false;
                this.router.navigate(['./recipes']);
            },
            errorMessage => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage)
                this.isLoading = false;
            }
        );

        form.reset();
    }
    onHandleError() {
        this.error = null;
    }

    private showErrorAlert(message: string) {
        //const alertCmp = new AlertComponent();
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContaineRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;

        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });

    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }
}