import { Injectable } from '@angular/core';
import { UserDTO } from '../dto/UserDTO';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequestDTO } from '../dto/AuthRequestDTO';
import { AuthResponseDTO } from '../dto/AuthResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginRequest: AuthRequestDTO): Observable<AuthResponseDTO> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<AuthResponseDTO>((`${environment.apiUrl}auth/login`), loginRequest, { headers });
  }


  public registerUser(user: UserDTO): Observable<UserDTO> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<UserDTO>((`${environment.apiUrl}auth/register`),user,{headers});
   }

  
}
