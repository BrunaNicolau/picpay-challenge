import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaymentsService } from '../../services/payments/payments.service';
import { Payment } from '../../shared/interface/payment.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeletComponent } from '../../shared/components/dialog-delet/dialog-delet.component';
import { DialogPaymentComponent } from '../../shared/components/dialog-payment/dialog-payment.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})

export class PaymentsComponent implements OnInit {
  displayedColumns = ['Usuário', 'Título', 'Data', 'Valor', 'Pago','Ações'];
  showtable: boolean = false;
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();
  dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.callPaymentList();
  }
  
  callPaymentList() {
    this.paymentsService.listPayment().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showtable = true;
      },
      error: () => {
        this._snackBar.open('Não foi possível carregar os pagamentos, tente novamente!', 'x', {
          duration: 5000
        });
      },
    });
  }
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeletDialog(selectPayment: Payment): void {
    const dialogDeletRef = this.dialog.open(DialogDeletComponent, {
      height: '300px',
      width: '300px',
      data: {selectPayment}
    });

    this.watchDialog(dialogDeletRef);
  }

  openEditDialog(selectPayment: Payment, edit: boolean): void {
    const dialogEditRef = this.dialog.open(DialogPaymentComponent, {
      height: '550px',
      width: '500px',
      data: { selectPayment, edit }
    });

    this.watchDialog(dialogEditRef);
  }

  openAddDialog(edit: boolean): void {
    const dialogAddRef = this.dialog.open(DialogPaymentComponent, {
      height: '550px',
      width: '500px',
      data: { edit }
    });

    this.watchDialog(dialogAddRef);
  }

  watchDialog(dialogRef: MatDialogRef<any, any>): void {
    dialogRef.afterClosed().subscribe(() => {
      this.callPaymentList();
    });
  }
}
