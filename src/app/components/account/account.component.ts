import { Component } from '@angular/core';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { CreateAccountDialogComponent } from '../create-account-dialog/create-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  accounts: AccountDTO[] = [];

  constructor(private accountService: AccountService, public dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
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
        this.accounts = accounts;
      },
      error => {
        console.error('Error fetching accounts:', error);
      }
    );
  }

}
