import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value;
       const confirmPassword = AC.get('rePassword').value;
        if (password !== confirmPassword && confirmPassword !== '') {
            AC.get('rePassword').setErrors( {MatchPassword: true} );
        } else {
            return null;
        }
    }
}

export const passwordRegex = {
  password: '^((?=.*[0-9])|(?=.*[!@#$%^&*]))[a-zA-Z0-9!@#$%^&*-_+=()]{8,50}$'
};
