import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnInit {
  pendingCount: number;
  completedCount: number;

  constructor(private todoService: TodoService) {
    this.pendingCount = todoService.pendingCount;
    this.completedCount = todoService.completedCount;
  }

  ngOnInit(): void {
    this.todoService.todoMessage.subscribe((data) => {
      this.pendingCount = data.pendingCount;
      this.completedCount = data.completedCount;
    });
  }
}
