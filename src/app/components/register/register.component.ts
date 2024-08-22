import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserDTO } from '../../dto/UserDTO';
import { throwError } from 'rxjs/internal/observable/throwError';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { tap } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  failedRegisterMsg: string='';

  constructor(private authService: AuthService,private router: Router,private userService: UserService, private snackBar: MatSnackBar) {
    this.registrationForm = new FormGroup(
      {
      firstName: new FormControl( '', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:new FormControl ('', [Validators.required, Validators.minLength(8)]),
      confirmPassword:new FormControl ('', [Validators.required]),
    }, 
    { 
      validators: this.passwordMatchValidator 
    }
    );
   }

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('confirmPassword')?.value ?  null : {mismatch: true} ;
      }
  
      onSubmit() {
        if (this.registrationForm.valid) {
          const formData = this.registrationForm.value;
          const user = new UserDTO(formData);
          this.authService.registerUser(user).pipe(
            tap(response => {
              this.userService.setToken(response.token);
              this.router.navigate(['/account']).then(() => {
                window.location.reload();
              });;;
            }),
            catchError(error => {
              if (error instanceof HttpErrorResponse) {
                // Check if the backend returned field-specific errors
                if (error.error && error.error.fieldErrors) {
                  //
                  error.error.fieldErrors.forEach((fieldError: any) => {
                    
                    this.snackBar.open(` ${fieldError.defaultMessage}`, undefined, {
                      duration: 5000,
                    });
                  });
                } else {
                  this.snackBar.open(error.error.message || 'An error occurred. Please try again.', undefined, {
                    duration: 5000,
                  });
                }
              } else {
                //  generic error message for non-HTTP errors
                this.snackBar.open('An unexpected error occurred. Please try again.', undefined, {
                  duration: 5000,
                });
              }
              // Return an observable with the error message for further handling
              return throwError(() => new Error(error.message || 'Unknown error'));
            })
          ).subscribe();
        } else {
          this.snackBar.open('Something went wrong...', undefined, {
            duration: 2000,
          });
        }
      }

    
   
  }