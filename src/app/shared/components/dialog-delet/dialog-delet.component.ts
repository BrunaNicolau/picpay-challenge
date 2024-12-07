import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { PaymentsService } from '../../../services/payments/payments.service';
import { CommonModule } from '@angular/common';
import { Payment } from '../../interface/payment.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-delet',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-delet.component.html',
  styleUrl: './dialog-delet.component.css',
})
export class DialogDeletComponent implements OnInit{
  readonly dialogRef = inject(MatDialogRef<DialogDeletComponent>);
  private _snackBar = inject(MatSnackBar);
  dataToView: any

  constructor(private paymentsService: PaymentsService,
    @Inject(MAT_DIALOG_DATA) public data: {element: Payment}
  ){}

  ngOnInit(): void {
    this.dataToView = this.data
  }

  callDeletPayment(id: number){
    this.paymentsService.deletPayment(id).subscribe({
      next: () => {
        this.dialogRef.close()
        this.showSnackBar('Apagado com sucesso !')
      }, 
      error: () => {
        this.showSnackBar('Não foi possive apagar, tente novamente !')
      },
    })
  }

  showSnackBar(txt: string){
    this._snackBar.open(txt, 'x', {
      duration: 5000
    });
  }
}
