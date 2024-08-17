import { Component, Inject } from '@angular/core';
import { AccountDTO } from '../../dto/AccountDTO';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {
  createAccountForm: FormGroup;

  constructor(private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createAccountForm = this.fb.group({
      name: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const accountDTO: AccountDTO = {
        id:0,
        name: this.createAccountForm.get('name')?.value,
        balance: this.createAccountForm.get('balance')?.value,
        currency: this.createAccountForm.get('currency')?.value
      };

      this.accountService.saveAccount(accountDTO).subscribe(
        (account) => {
          this.dialogRef.close(account);
          this.router.navigate(['account']).then(()=>{location.reload();});

        },
        error => {
          console.error('Error saving account', error);
        }
      );
    }
  }
}
