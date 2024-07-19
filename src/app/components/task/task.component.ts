import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(title: string, author: string, content: string): void {
    const newTask: Task = {
      id: new Date().getTime().toString(),
      title,
      author,
      content,
      createdAt: new Date()
    };
    this.taskService.addTask(newTask);
    this.tasks = this.taskService.getTasks();
  }
}
