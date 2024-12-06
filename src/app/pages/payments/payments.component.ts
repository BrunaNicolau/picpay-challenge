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
import { MatDialog } from '@angular/material/dialog';
import { DialogDeletComponent } from '../../shared/components/dialog-delet/dialog-delet.component';
import { DialogPaymentComponent } from '../../shared/components/dialog-payment/dialog-payment.component';
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
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css',
})
export class PaymentsComponent implements OnInit {
  dataTable: Payment[] = [];
  displayedColumns = ['Usuário', 'Título', 'Data', 'Valor', 'Ações'];
  showtable: boolean = false;
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();
  dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private paymentsService: PaymentsService) {}

  ngOnInit(): void {
    this.callPaymentList();
  }

  callPaymentList() {
    this.paymentsService.listPayment().subscribe({
      next: (res) => {
        this.dataTable = res.data;
        this.dataSource = new MatTableDataSource(this.dataTable);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showtable = true;
      },
      error(err) {
        console.log('tratar o list error', err);
      },
    });
  }

  openDeletDialog(selectPayment: Payment): void {
    this.dialog.open(DialogDeletComponent, {
      height: '300px',
      width: '300px',
      data: {selectPayment}
    });
  }

  openEditDialog(selectPayment: Payment): void {
    const edit = true
    this.dialog.open(DialogPaymentComponent, {
      data: {selectPayment, edit}
    })
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
