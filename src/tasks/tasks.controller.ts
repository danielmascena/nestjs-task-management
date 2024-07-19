import {
  Param,
  Post,
  Controller,
  Get,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: string): Task {
    console.log(taskId);
    return this.tasksService.getTaskById(taskId);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Patch(':id/status')
  updateTask(@Param('id') targetId: string, @Body() status: TaskStatus): Task {
    return this.tasksService.updateTask(targetId, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') taskId: string): Task {
    return this.tasksService.deleteTask(taskId);
  }
}
