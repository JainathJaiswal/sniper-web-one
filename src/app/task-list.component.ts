import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html'
})

export class TaskListComponent implements OnInit {
  tasks: Task[];
  newTask: Task = new Task();
  editing: boolean = false;
  editingTask: Task = new Task();

  constructor(
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks()
      .then(tasks => this.tasks = tasks );    
  }

  createTask(taskForm: NgForm): void {
    this.taskService.createTask(this.newTask)
      .then(createTask => {        
        taskForm.reset();
        this.newTask = new Task();
        this.tasks.unshift(createTask)
      });
  }
  
   deleteTask(id: number): void {
    this.taskService.deleteTask(id)
    .then(() => {
      this.tasks = this.tasks.filter(task => task.id != id);
    });
  }

  updateTask(taskData: Task): void {
    console.log(taskData);
    this.taskService.updateTask(taskData)
    .then(updatedTask => {
      let existingTask = this.tasks.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
      this.clearEditing();
    });
  }

  toggleCompleted(taskData: Task): void {
    taskData.completed = !taskData.completed;
    this.taskService.updateTask(taskData)
    .then(updatedTask => {
      let existingTask = this.tasks.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
    });
  }

  editTask(taskData: Task): void {
    this.editing = true;
    Object.assign(this.editingTask, taskData);
  }

  clearEditing(): void {
    this.editingTask = new Task();
    this.editing = false;
  }
}