import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageKey = 'tasks';

  constructor() { }

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.localStorageKey);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(tasks));
  }

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  }

  deleteTask(taskId: string): void {
    let tasks = this.getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    this.saveTasks(tasks);
  }

  updateTask(updatedTask: Task): void {
    let tasks = this.getTasks();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    this.saveTasks(tasks);
  }

  searchTasks(query: string): Task[] {
    const tasks = this.getTasks();
    return tasks.filter(task => 
      task.title.toLowerCase().includes(query.toLowerCase()) ||
      task.author.toLowerCase().includes(query.toLowerCase()) ||
      task.content.toLowerCase().includes(query.toLowerCase())
    );
  }
}
