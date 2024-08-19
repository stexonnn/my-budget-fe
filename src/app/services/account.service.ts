import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDTO } from '../dto/AccountDTO';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  constructor(private http: HttpClient) {}

  getUserAccounts(): Observable<AccountDTO[]> {
    return this.http.get<AccountDTO[]>(`${environment.apiUrl}account/getAccounts`);
  }

  getTotalValue(): Observable<number>{
    return this.http.get<number>(`${environment.apiUrl}user/getTotalValue`);
  }

  saveAccount(account: AccountDTO): Observable<any> {
    alert(account.currency);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AccountDTO>((`${environment.apiUrl}account/createAccount`),account,{headers});
  }
  
  deleteAllData(): Observable<any> {
    alert("brise front");
    return this.http.delete(`${environment.apiUrl}user/delete`);
  }

}