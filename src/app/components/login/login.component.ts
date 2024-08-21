import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthRequestDTO } from '../../dto/AuthRequestDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(8)]),
    }) 
  }

  onSubmit() {
    if (this.loginForm && this.loginForm.valid) {
      const loginData = this.loginForm.value;
      const authRequest = new AuthRequestDTO(loginData);
      this.auth.login(authRequest).subscribe(
        response => {
          this.userService.setToken(response.token);
          this.router.navigate(['/account']);
        },
        error => {
            if (error instanceof HttpErrorResponse) {
              // Check if the backend returned field-specific errors
              if (error.error && error.error.fieldErrors) {
                //
                error.error.fieldErrors.forEach((fieldError: any) => {
                  console.log(fieldError.field) 
                  console.log(fieldError.message)
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
      
    }
  }


  isFieldInvalid(field: string) {
    const formControl = this.loginForm.get(field);
    return formControl?.invalid && formControl?.touched;
  }
}
