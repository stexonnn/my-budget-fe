import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';
import { TransactionTypeDTO } from '../dto/TransactionTypeDTO';
import { TransactionDTO } from '../dto/TransactionDTO';
import { AccountDTO } from '../dto/AccountDTO';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }


  getAllTransactions(): Observable<TransactionDTO[]> {
    return this.http.get<TransactionDTO[]>(`${environment.apiUrl}transactions/getAll`);
  }

  getTransactions(account_Id:string ): Observable<TransactionDTO[]> {
    return this.http.get<TransactionDTO[]>(`${environment.apiUrl}transactions/get/${account_Id}`);
  }

  getAllTransactionTypes(): Observable<TransactionTypeDTO[]> {
    return this.http.get<TransactionTypeDTO[]>(`${environment.apiUrl}transactionType/getAll`);
  }

  saveTransaction(transaction: any): Observable<any> {
    alert(transaction.type + transaction.description + transaction.account + transaction.amount);
    
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>((`${environment.apiUrl}transactions/save`),transaction,{headers});
  }
}
