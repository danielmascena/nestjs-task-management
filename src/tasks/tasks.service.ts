import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks = new Array<Task>();

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find(({ id }) => id === taskId) ?? null;
  }

  getTasksWithFilters(filterDTO: GetTasksFilterDTO) {
    const { status: filterStatus, search: filterSearch } = filterDTO;

    if (status) {
      return this.tasks.find(({ status }) => status === filterStatus);
    }
    if (filterSearch) {
    }
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

  updateTask(taskId: string, status: TaskStatus): Task {
    const targetTask = this.getTaskById(taskId);

    if (targetTask) {
      targetTask.status = status;
    }
    return targetTask;
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
