import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { TransactionDTO } from '../../dto/TransactionDTO';
import { MatSnackBar } from '@angular/material/snack-bar';

export function amountValidator(formGroup: FormGroup): ValidationErrors | null {
  const amountControl = formGroup.get('amount');
  const transactionTypeControl = formGroup.get('type');

  if (!amountControl || !transactionTypeControl) {
    return null;
  }

  const amount = amountControl.value;
  const transactionType = transactionTypeControl.value;

  if ((transactionType === 'income' && amount < 0) || (transactionType === 'expense' && amount>=0)) {
    console.log("greskaaa");
    return { amountError: true };}
  

  return null; 
}

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.css']
})
export class TransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;
  userAccounts: AccountDTO[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private accountService: AccountService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionDialogComponent>
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      type: ['Expense', Validators.required],
      account: ['', Validators.required],
      amount: ['', Validators.required]
    },  { validators: amountValidator });
    this.transactionForm?.get('type')?.setValue('expense');  
  
  }

  ngOnInit(): void {
    this.loadUserAccounts();
  }


  loadUserAccounts(): void {
    this.accountService.getUserAccounts().subscribe(
      (accounts: AccountDTO[]) => {
        this.userAccounts = accounts;
      },
      (error: any) => {
        this.snackBar.open('Error loading user accounts', undefined, {
          duration: 2000,
        });
      }
    );
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      const transactionDTO = new TransactionDTO(transactionData.description, transactionData.amount,
        transactionData.type, transactionData.account,0,"","");

      this.transactionService.saveTransaction(transactionDTO).subscribe(
        response => 
        this.snackBar.open('Save successful', undefined, {
          duration: 2000,
        }),
        error => 
        this.snackBar.open('Saving failed', undefined, {
          duration: 2000,
        })
      );
      this.dialogRef.close(transactionData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}