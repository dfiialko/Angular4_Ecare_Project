import { AuthenticationService } from './../shared/authentication/authentication.service.ts.service';
import { ValidatorService } from './../shared/form_validation/validator.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // this.authService.refresh();
        let active = false;
        localStorage.getItem('auth_token') !== null ? active = true : this.router.navigate(['login']);
        if (active) {
            this.authService.authenticated = true;
            console.log(active);
        }
        return active;
    }
}
