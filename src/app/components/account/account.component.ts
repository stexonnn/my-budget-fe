import { Component } from '@angular/core';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  accounts: AccountDTO[] = [];
  defaultCurrency: string ="";
  constructor(private accountService: AccountService, public dialog: MatDialog,
    private router: Router, private currencyService: CurrencyService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getDefaultCurrency();
    this.loadAccounts();
  }

  openCreateAccountDialog(): void {
    const dialogRef = this.dialog.open(CreateAccountDialogComponent, {
      width: '300px',
      data: { name: '', balance: 0, currency: 'USD' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAccounts();
      }
    });
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe(
      (accounts: AccountDTO[]) => {
        accounts.filter(acc=>acc.currency).map(acc => acc.currency.toUpperCase());
        this.accounts = accounts;
      },
      error => {
        
        this.snackBar.open('Error fetching accounts', undefined, {
          duration: 2000,
        });
      }
    );
  }

  getDefaultCurrency() {
    this.currencyService.getDefaultCurrency().subscribe(response => {
      console.log(response)
      console.log(response["currency"])
      this.defaultCurrency=response["currency"]}
    );
  }

}
