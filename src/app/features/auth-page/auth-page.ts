import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.scss',
})
export class AuthPage {
  private readonly router = inject(Router);

  email = '';
  password = '';

  errorMessage = '';
  successMessage = '';

  onSubmit(): void {
    const isValid =
      this.email === 'admin@mail.ru' &&
      this.password === '1234';

    if (isValid) {
      this.errorMessage = '';
      this.successMessage = 'Успешный вход (мок-авторизация).';
      // Редирект на домашнюю страницу
      this.router.navigateByUrl('/');
    } else {
      this.successMessage = '';
      this.errorMessage = 'Неверный логин или пароль.';
    }
  }
}


