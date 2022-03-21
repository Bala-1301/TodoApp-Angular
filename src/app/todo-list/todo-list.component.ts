import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.sass'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  showAddTodo: boolean = false;

  constructor(private todoService: TodoService) {
    this.todos = todoService.todos;
  }

  ngOnInit(): void {
    this.todoService.todoMessage.subscribe((data) => (this.todos = data.todos));
    this.todoService.getTodos();
  }

  addTodo() {
    this.showAddTodo = false;
  }

  handleAddTodo() {
    this.showAddTodo = true;
  }
}
