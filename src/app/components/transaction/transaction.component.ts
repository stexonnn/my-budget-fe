import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDTO } from '../../dto/TransactionDTO';
import { TransactionService } from '../../services/transaction.service';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { CurrencyService } from '../../services/currency.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent {

   transactions: TransactionDTO[] = [];
   accounts: AccountDTO[] = []
   defaultCurrency: string= "EUR";
  
  constructor(public dialog: MatDialog, private transactionService: TransactionService, private snackBar: MatSnackBar,
     private accountService: AccountService, private router: Router, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getDefaultCurrency();
    this.loadTransactions();
    this.loadAccounts();
  }

  loadTransactions(): void {
    this.transactionService.getAllTransactions().subscribe(
      (transactions: TransactionDTO[]) => {
        console.log(transactions.at(4))
        this.transactions = transactions;

      },
      (error: any) => {
        this.snackBar.open('Error loading transaction types', undefined, {
          duration: 2000,
        });
      }
    );
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
      this.snackBar.open('Error loading transaction types', undefined, {
        duration: 2000,
      });
      
    });
  }
  }

  loadAccounts(): void {
    this.accountService.getUserAccounts().subscribe(
      (accounts: AccountDTO[]) => {
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
    this.currencyService.getDefaultCurrency().subscribe(response =>  {
      console.log("currency" + response["currency"])
      this.defaultCurrency=response["currency"]
    }
    );
  }
}
