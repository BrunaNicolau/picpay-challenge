import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { loginInterface } from '../../shared/interface/login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authForm: FormGroup;
  hidePassword: Boolean = true;
  showLoginError: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      userEmail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  logar(userData: loginInterface) {
    this.authenticationService.listLogin().subscribe({
      next: (res)=>{
        this.isUserValid(res, userData) ? this.router.navigate(['payments']) : this.showLoginError = true
      },
      error(err) {
        console.log('tratar o login error', err)
      },
    })
  }

  isUserValid(res: any[], userData: { userEmail: string; password: string }): boolean {
    return res.some(user => user.email === userData.userEmail && user.password === userData.password);
  }
}
