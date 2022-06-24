import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass'],
})
export class TodoComponent implements OnInit {
  constructor(private todoService: TodoService) {}
  @Input() todo: Todo = {
    id: -1,
    desc: '',
    isDone: false,
    createdAt: new Date(),
  };

  ngOnInit(): void {}

  handleUndo() {
    this.todoService.undoTodoComplete(this.todo);
  }

  handleDone() {
    this.todoService.markTodoComplete(this.todo);
  }

  handleDelete() {
    this.todoService.deleteTodo(this.todo);
  }
}
