import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../create-transaction-dialog/create-transaction-dialog.component';
import { TransactionDTO } from '../../dto/TransactionDTO';
import { TransactionService } from '../../services/transaction.service';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

   transactions: TransactionDTO[] = [];
   accounts: AccountDTO[] = []

  constructor(public dialog: MatDialog, private transactionService: TransactionService,
     private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (transactions: TransactionDTO[]) => {
        this.transactions = transactions;

      },
      (error: any) => {
        console.error('Error loading transaction types', error);
      }
    );
  }


  openTransactionDialog(): void {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transaction data:', result);
      }
    });
  }

  onAccountChange(event: MatSelectChange): void {
    if (event.value==="all")  {
      this.loadTransactions();
    }
    else {
    const selectedAccountId = event.value;
    
    this.transactionService.getTransactions(selectedAccountId).subscribe((transactions: TransactionDTO[]) => {
      this.transactions = transactions;
    },
    (error: any) => {
      console.error('Error loading transaction types', error);
    });
  }
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
