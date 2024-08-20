import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getAllCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.apiUrl}currency/getAll`);
  }

  getLastUpdated(): Observable<{[key: string]: string}> {
    return  this.http.get<{[key: string]: string}>(`${environment.apiUrl}currency/getLastUpdated`);
    
  }

  updateDefaultCurrency(defaultCurrency: string): Observable<string> {
    alert(defaultCurrency);
    return this.http.put<string>(`${environment.apiUrl}currency/updateDefaultCurrency`, defaultCurrency);
  }

  getDefaultCurrency(): Observable<{[key: string]: string }> {
    return this.http.get<{[key: string]: string }>(`${environment.apiUrl}currency/getDefaultCurrency`);
  }
}
