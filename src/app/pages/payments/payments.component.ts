import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

}
