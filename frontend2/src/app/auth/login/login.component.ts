import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-pink-100">
  <div class="bg-black p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl font-bold text-pink-300 text-center mb-4">Login</h1>
    
    <input 
      [(ngModel)]="username" 
      placeholder="Username" 
      class="w-full border p-2 rounded mb-2 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
    
    <input 
      type="password" 
      [(ngModel)]="password" 
      placeholder="Password" 
      class="w-full border p-2 rounded mb-4 bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
    >
    
    <button 
      (click)="login()" 
      class="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition"
    >
      Login
    </button>
    
    <p class="mt-4 text-center text-pink-200">
      No account? 
      <a routerLink="/signup" class="text-pink-400 hover:underline">Sign up</a>
    </p>
  </div>
</div>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<{ token: string }>('http://localhost:3003/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/todos']);
      },
      error: () => alert('Login failed')
    });
  }
}