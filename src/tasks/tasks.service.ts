import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks = new Array<Task>();

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find(({ id }) => id === taskId) ?? null;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(taskId: string): Task {
    const idx = this.tasks.findIndex(({ id }) => id === taskId);

    if (idx !== -1) {
      const task = this.tasks[idx];
      this.tasks.splice(idx, 1);
      return task;
    }
    return null;
  }
}
