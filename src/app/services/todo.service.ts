import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface TodoItem {
  todos: Todo[];
  pendingCount: number;
  completedCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService implements OnInit {
  todos: Todo[] = [];
  pendingCount: number = 0;
  completedCount: number = 0;
  private url: string =
    'https://todoangular-394a6-default-rtdb.firebaseio.com/todos.json';
  todoSource = new Subject<TodoItem>();
  todoMessage = this.todoSource.asObservable();
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getTodos() {
    this.fetchTodos().subscribe((data: any) => {
      this.todos = data || [];
      let pending = 0,
        completed = 0;
      this.todos.forEach((todo: Todo) => {
        if (todo.isDone) {
          completed++;
        } else {
          pending++;
        }
      });
      this.pendingCount = pending;
      this.completedCount = completed;
      this.todoSource.next({
        todos: this.todos,
        pendingCount: this.pendingCount,
        completedCount: this.completedCount,
      });
    });
  }

  fetchTodos() {
    return this.http.get(this.url);
  }

  updateTodos() {
    this.todoSource.next({
      todos: this.todos,
      pendingCount: this.pendingCount,
      completedCount: this.completedCount,
    });
    this.http.put(this.url, this.todos).subscribe((data) => console.log(data));
  }

  addTodo(todoDesc: string) {
    let id = 0;
    if (this.todos.length > 0) {
      id = this.todos[this.todos.length - 1].id + 1;
    }
    this.todos.push({
      id: id,
      desc: todoDesc,
      isDone: false,
      createdAt: new Date(),
    });
    this.pendingCount += 1;
    this.updateTodos();
  }

  undoTodoComplete(todo: Todo) {
    todo.isDone = false;
    this.pendingCount += 1;
    this.completedCount -= 1;

    this.updateTodos();
  }

  markTodoComplete(todo: Todo) {
    todo.isDone = true;
    this.pendingCount -= 1;
    this.completedCount += 1;

    this.updateTodos();
  }

  deleteTodo(todo: Todo) {
    if (todo.isDone) {
      this.completedCount -= 1;
    } else {
      this.pendingCount -= 1;
    }
    this.todos = this.todos.filter((_todo) => _todo.id !== todo.id);

    this.updateTodos();
  }
}

export interface Todo {
  id: number;
  desc: string;
  isDone: boolean;
  createdAt: Date;
}
