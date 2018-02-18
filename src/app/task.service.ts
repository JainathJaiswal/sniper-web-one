import { Injectable } from '@angular/core';
import { Task } from './task';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: Http) { }

  getTasks():  Promise<Task[]> {
    return this.http.get(this.baseUrl + '/v1/tasks/')
      .toPromise()
      .then(response => response.json() as Task[])
      .catch(this.handleError);
  }

  createTask(taskData: Task): Promise<Task> {
	   console.log('LLLLLLLLLLLLLLL',taskData.name);
    return this.http.post(this.baseUrl + '/v1/tasks/', taskData)
      .toPromise().then(response => response.json() as Task)
      .catch(this.handleError);
  }

    updateTask(taskData: Task): Promise<Task> {
    return this.http.put(this.baseUrl + '/v1/tasks/' + taskData.id, taskData)
      .toPromise()
      .then(response => response.json() as Task)
      .catch(this.handleError);
  }

  deleteTask(id: number): Promise<any> {
    return this.http.delete(this.baseUrl + '/v1/tasks/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Some error occured', error);
    return Promise.reject(error.message || error);
  }
}