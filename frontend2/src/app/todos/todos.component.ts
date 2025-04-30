import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Todo {
  _id?: string;
  title: string;
  completed: boolean;
  originalTitle?: string; 
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todos.component.html'
})
export class TodosComponent {
  todos: Todo[] = [];
  newTodo = '';
  editingTodoId: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadTodos();
  }

 
  isEditing(todo: Todo): boolean {
    return this.editingTodoId === todo._id;
  }


  startEditing(todo: Todo) {
    this.editingTodoId = todo._id!;
    todo.originalTitle = todo.title; 
  }


  saveEdit(todo: Todo) {
    if (todo.title.trim()) {
      const token = localStorage.getItem('token');
      this.http.put(`http://localhost:3003/api/todos/${todo._id}`, 
        { title: todo.title.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      ).subscribe(() => {
        this.editingTodoId = null;
        todo.originalTitle = undefined;
      });
    }
  }


  cancelEdit(todo: Todo) {
    if (todo.originalTitle) {
      todo.title = todo.originalTitle;
    }
    this.editingTodoId = null;
    todo.originalTitle = undefined;
  }

 
  loadTodos() {
    const token = localStorage.getItem('token');
    this.http.get<Todo[]>('http://localhost:3003/api/todos', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(todos => this.todos = todos);
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const token = localStorage.getItem('token');
      this.http.post<Todo>('http://localhost:3003/api/todos', 
        { title: this.newTodo.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      ).subscribe(todo => {
        this.todos.push(todo);
        this.newTodo = '';
      });
    }
  }

  toggleComplete(todo: Todo) {
    const token = localStorage.getItem('token');
    this.http.put(`http://localhost:3003/api/todos/${todo._id}`, 
      { completed: !todo.completed },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe();
  }

  deleteTodo(id: string) {
    const token = localStorage.getItem('token');
    this.http.delete(`http://localhost:3003/api/todos/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(() => {
      this.todos = this.todos.filter(t => t._id !== id);
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}