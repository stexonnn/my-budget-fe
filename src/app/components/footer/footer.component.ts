import { Component } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CurrencyService } from '../../services/currency.service';
import { TransactionDialogComponent } from '../create-transaction-dialog/create-transaction-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  totalValue: string = "";
  defaultCurrency: string="EUR";

  constructor(public dialog: MatDialog, private accountService: AccountService, private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.getTotalValue();
    this.getDefaultCurrency();
  }

  getTotalValue(): void {
      this.accountService.getTotalValue().subscribe(value=> {
        let formatedValue = value.toFixed(2);
         this.totalValue=formatedValue;
        })
      }

  getDefaultCurrency() {
    this.currencyService.getDefaultCurrency().subscribe(response => {
      console.log(response)
      console.log(response["currency"])
      this.defaultCurrency=response["currency"].toUpperCase()}
    );
  }

  openTransactionDialog(event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Transaction data:', result);
      }
    });
  }
}
