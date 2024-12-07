  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Payment } from '../../shared/interface/payment.interface';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  //TODO: tipar os retornos

  url: string = environment.apiUrl

  constructor(private http: HttpClient) {}

  public listPayment() {
    return this.http
      .get(this.url + 'tasks?_page=5')
      .pipe(map((res: any) => res as any));
  }

  public getPaymentById(id: number) {
    return this.http
      .get(this.url + 'tasks?id=' + id)
      .pipe(map((res: any) => res as any));
  }

  public addPayment(req: Payment) {
    return this.http
      .post(this.url + 'tasks', req)
      .pipe(map((res: any) => res as any));
  }

  //TODO: criar uma model para novos pagamentos
  public editPayment(id: number, updatedPayment: any) {
    return this.http
      .patch(this.url + 'tasks/' + id, updatedPayment)
      .pipe(map((res: any) => res as any));
  }

  public deletPayment(req: number) {
    return this.http
      .delete(this.url + 'tasks/' + req)
      .pipe(map((res: any) => res as any));
  }
}
