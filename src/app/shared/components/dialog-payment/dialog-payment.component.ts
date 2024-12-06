import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentsService } from '../../../services/payments/payments.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dialog-payment',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './dialog-payment.component.html',
  styleUrl: './dialog-payment.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPaymentComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentsService: PaymentsService,
    @Inject(MAT_DIALOG_DATA) public dataToView: any
  ) {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.dataToView.edit) this.fillFields();
  }

  fillFields() {
    this.dataToView.title = 'Editar o Pagamento';
    this.formData.patchValue(this.dataToView.selectPayment);
  }

  callService() {
    if (this.dataToView.edit) {
      this.callEditPayment();
    } else {
      this.callAddPayment();
    }
  }

  callEditPayment() {
    const paymentId = this.dataToView.selectPayment.id;
    this.paymentsService.editPayment(paymentId, this.formData.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  callAddPayment() {
    console.log('fazer a chamada para o post');
  }
}
