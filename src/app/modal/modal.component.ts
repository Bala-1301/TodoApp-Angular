import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
})
export class ModalComponent implements OnInit {
  todoDesc: string = '';

  @Output() addTodoEvent = new EventEmitter<null>();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  handleAddTodo() {
    if (this.todoDesc.length === 0) return;
    this.todoService.addTodo(this.todoDesc);
    this.addTodoEvent.emit();
  }
}
