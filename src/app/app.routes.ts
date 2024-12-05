import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PaymentsComponent } from './pages/payments/payments.component';

export const routes: Routes = [
  { path: '', component: LoginComponent  },
  { path: 'payments', component: PaymentsComponent  },
];
