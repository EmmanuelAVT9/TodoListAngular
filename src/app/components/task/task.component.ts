import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  searchResults: Task[] = [];

  @ViewChild('title') titleInput!: ElementRef;
  @ViewChild('author') authorInput!: ElementRef;
  @ViewChild('content') contentInput!: ElementRef;

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

     // Limpiar los campos de entrada
     this.titleInput.nativeElement.value = '';
     this.authorInput.nativeElement.value = '';
     this.contentInput.nativeElement.value = '';
  }
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId);
    this.tasks = this.taskService.getTasks();
  }

  updateTask(updatedTask: Task): void {
    this.taskService.updateTask(updatedTask);
    this.tasks = this.taskService.getTasks();
  }

  updateTaskTitle(task: any, newTitle: string) {
    return { ...task, title: newTitle };
  }
  
  searchTasks(query: string): void {
    this.searchResults = this.taskService.searchTasks(query);
  }
}
