import { Component, Inject } from '@angular/core';
import { AccountDTO } from '../../dto/AccountDTO';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-account-dialog',
  templateUrl: './create-account-dialog.component.html',
  styleUrl: './create-account-dialog.component.css'
})
export class CreateAccountDialogComponent {
  createAccountForm: FormGroup;
  currencies: string[] = []

  constructor(private currencyService: CurrencyService,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
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
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.currencyService.getAllCurrencies().subscribe( (currencies) => { 
      this.currencies = currencies;
    })
  }

  onSubmit() {
    if (this.createAccountForm.valid) {
      const accountDTO: AccountDTO = {
        id: 0,
        name: this.createAccountForm.get('name')?.value,
        balance: this.createAccountForm.get('balance')?.value,
        currency: this.createAccountForm.get('currency')?.value,
        balanceInDefaultCurrency: 0
      };

      this.accountService.saveAccount(accountDTO).subscribe(
        (account) => {
          this.dialogRef.close(account);
          this.router.navigate(['account']).then(()=>{location.reload();});

        },
        error => {
          
          this.snackBar.open('Error saving account', undefined, {
            duration: 2000,
          });
        }
      );
    }
  }
}
