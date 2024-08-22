import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';
import { AccountComponent } from '../account/account.component';
import { format } from 'path';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  lastUpdatedDate!: string;
  defaultCurrency: string ="eur";
  currencies: string[]=[];

  constructor(private accountService: AccountService, private currencyService: CurrencyService, private snackBar: MatSnackBar)  {}

  ngOnInit() {
    this.lastUpdated();
    this.loadCurrencies();
    this.getDefaultCurrency();
  }

   lastUpdated() {
    this.currencyService.getLastUpdated().subscribe(date => {
      this.lastUpdatedDate = date["lastUpdated"]}
    );
    }

    loadCurrencies() {
      this.currencyService.getAllCurrencies().subscribe( (currencies) => { 
        this.currencies = currencies;
      })
    }
  
    updateDefaultCurrency(event:any) {
      this.currencyService.updateDefaultCurrency(event.value).subscribe({
        next: (response) => {
          this.defaultCurrency=event.value;
          this.snackBar.open('Currency updated successfully', undefined, {
            duration: 2000,
          });
        },
        error: (error) => {
          this.snackBar.open('Error updating default currency', undefined, {
            duration: 2000,
          });
        }
      });
    }  

    getDefaultCurrency() {
      this.currencyService.getDefaultCurrency().subscribe(response => {
        this.defaultCurrency=response["currency"]}
      );
    }
    

  deleteAllData(event: Event) {
    event.preventDefault();
    this.accountService.deleteAllData().subscribe(
        () => {
            this.snackBar.open('Data deleted successfully:', undefined, {
              duration: 2000,
            });
        },
        (error) => {
            this.snackBar.open('Data deleted successfully:', undefined, {
              duration: 2000,
            });
        }
    );
  }



}
