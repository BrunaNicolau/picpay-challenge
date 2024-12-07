import {
  ChangeDetectionStrategy,
  Component,
  inject,
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
import { DialogDeletComponent } from '../dialog-delet/dialog-delet.component';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  readonly dialogRef = inject(MatDialogRef<DialogDeletComponent>);
  private _snackBar = inject(MatSnackBar);

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
    this.dataToView.title = 'Adicionar Pagamento'
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
        this.dialogRef.close()
        this.showSnackBar('Editado com sucesso !')
      },
      error: () => {
        this.showSnackBar('Não foi possive editar os dados, tente novamente !')
      },
    });
  }

  callAddPayment() {
    const newPayment = this.formData.value
    this.paymentsService.addPayment(newPayment).subscribe({
      next: () => {
        this.dialogRef.close()
        this.showSnackBar('Adicionado com sucesso !')
      },
      error: () => {
        this.showSnackBar('Não foi possive adcionar o pagamento, tente novamente !')
      },
    })
  }

  showSnackBar(txt: string){
    this._snackBar.open(txt, 'Fechar', {
      duration: 5000
    });
  }
}
