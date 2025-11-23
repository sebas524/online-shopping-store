import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, JsonPipe, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.myForm?.invalid) {
      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false);
      }, 2000);
      this.myForm?.markAllAsTouched();
      return;
    }

    const { email = '', password = '' } = this.myForm?.value;

    console.log({ email, password });

    this.authService.login(email!, password!).subscribe({
      next: (isAuthenticated) => {
        console.log({ isAuthenticated });
        if (isAuthenticated) {
          // * navigate to homepage:
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => {
        console.log({ err });
        this.hasError.set(true);
        setTimeout(() => {
          this.hasError.set(false);
        }, 2000);
      },
    });

    this.myForm.reset();
  }
}
