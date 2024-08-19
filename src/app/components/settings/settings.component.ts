import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  lastUpdatedDate!: Date;

  constructor(private accountService: AccountService, private currencyService: CurrencyService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.lastUpdated();
  }

   lastUpdated() {
    this.currencyService.getLastUpdated().subscribe(date => 
      this.lastUpdatedDate = date
    );
    }
  
    updateDefaultValue(event:any) {
      this.currencyService.updateDefaultCurrency(event.value).subscribe({
        next: (response) => {
          console.log('Default currency updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating default currency:', error);
        }
      });
    }  
    

  deleteAllData(event: Event) {
    event.preventDefault();
    this.accountService.deleteAllData().subscribe(
        () => {
            console.log('Data deleted successfully');
            this.snackBar.open('Data deleted successfully:', undefined, {
              duration: 2000,
            });
            

        },
        (error) => {
            console.error('Error deleting data:', error);
            this.snackBar.open('Data deleted successfully:', undefined, {
              duration: 2000,
            });
        }
    );
  }


}
