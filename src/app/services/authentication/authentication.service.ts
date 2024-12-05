import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  //TODO: chamar o back direto no localhost
  constructor(private http: HttpClient) {}

  public listLogin() {
    return this.http
      .get('http://localhost:3000/account')
      .pipe(map((res: any) => res as any));
  }
}
