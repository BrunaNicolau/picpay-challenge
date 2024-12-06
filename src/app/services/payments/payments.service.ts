import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Payment } from '../../shared/interface/payment.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  //TODO: chamar o back sem ser direto no localhost
  //TODO: tipar os retornos

  constructor(private http: HttpClient) {}

  public listPayment() {
    return this.http
      .get('http://localhost:3000/tasks?_page=10')
      .pipe(map((res: any) => res as any));
  }

  public getPaymentById(id: number) {
    return this.http
      .get('http://localhost:3000/tasks?id=' + id)
      .pipe(map((res: any) => res as any));
  }

  public addPayment(req: Payment) {
    return this.http
      .post('http://localhost:3000/tasks', req)
      .pipe(map((res: any) => res as any));
  }

  //TODO: criar uma model para novos pagamentos
  public editPayment(id: number, updatedPayment: any) {
    return this.http
      .patch('http://localhost:3000/tasks/' + id, updatedPayment)
      .pipe(map((res: any) => res as any));
  }

  public deletPayment(req: number) {
    return this.http
      .delete('http://localhost:3000/tasks/' + req)
      .pipe(map((res: any) => res as any));
  }
}
