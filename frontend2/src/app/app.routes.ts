import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { TodosComponent} from './todos/todos.component';
import { SignupComponent } from './auth/signup/signup.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Todo', component: TodosComponent},
  { path: '', redirectTo: '/Todo', pathMatch: 'full' },
  { path: '**', redirectTo: '/Todo'}
];