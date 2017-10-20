import { ValidatorService } from './../shared/form_validation/validator.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private validateService: ValidatorService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  
        if(this.validateService.loggedIn){
            return true;
        }
        else{
            this.router.navigate(['login']);
        }
    }

}