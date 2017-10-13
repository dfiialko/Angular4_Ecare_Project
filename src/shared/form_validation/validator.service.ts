import { Injectable } from '@angular/core';

@Injectable()
export class ValidatorService {

constructor() { }
validate = false;
errorMessage: string;

validateInput(inputValue) {
    // tslint:disable-next-line:max-line-length
    const re = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/;
    if (inputValue === '') {
        this.errorMessage = 'Email / Password cannot be empty';
        return false;
    }else if (!re.test(inputValue)) {
        console.log(re.test(inputValue));
        this.errorMessage = 'Email or Password cannot have special characters';
        return false;
    }else {
        console.log('no errors');
        return true;
    }
}
}
