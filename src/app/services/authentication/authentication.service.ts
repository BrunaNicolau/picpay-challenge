import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  public listLogin() {
    return this.http
      .get(this.url + 'account')
      .pipe(map((res: any) => res as any));
  }
}
