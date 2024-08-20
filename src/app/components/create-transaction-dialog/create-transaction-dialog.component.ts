import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction.service';
import { TransactionTypeDTO } from '../../dto/TransactionTypeDTO';
import { AccountDTO } from '../../dto/AccountDTO';
import { AccountService } from '../../services/account.service';
import { TransactionDTO } from '../../dto/TransactionDTO';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './create-transaction-dialog.component.html',
  styleUrls: ['./create-transaction-dialog.component.css']
})
export class TransactionDialogComponent implements OnInit {
  transactionForm: FormGroup;
  transactionTypes: TransactionTypeDTO[] = [];
  userAccounts: AccountDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<TransactionDialogComponent>
  ) {
    this.transactionForm = this.fb.group({
      description: ['', Validators.required],
      type: ['', Validators.required],
      account: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTransactionTypes();
    this.loadUserAccounts();
  }

  loadTransactionTypes(): void {
    this.transactionService.getAllTransactionTypes().subscribe(
      (types: TransactionTypeDTO[]) => {
        this.transactionTypes = types;

      },
      (error: any) => {
        console.error('Error loading transaction types', error);
      }
    );
  }

  loadUserAccounts(): void {
    this.accountService.getUserAccounts().subscribe(
      (accounts: AccountDTO[]) => {
        this.userAccounts = accounts;
      },
      (error: any) => {
        console.error('Error loading user accounts', error);
      }
    );
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;
      const transactionDTO = new TransactionDTO(transactionData.description, transactionData.amount,
        transactionData.type, transactionData.account,0,"","");

      this.transactionService.saveTransaction(transactionDTO) .subscribe(
        response => console.log('Save successful:', response),
        error => console.error('Save failed:', error)
      );;
      this.dialogRef.close(transactionData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}