import { Controller, Post, Get, Param, Body, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso', type: Task })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const userId = req.user.userId; 
    return this.taskService.create(createTaskDto, userId);
  }

  @ApiOperation({ summary: 'Lista todas as tarefas de um usuário' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas', type: [Task] })
  @Get()
  async findAllByUserId(@Request() req): Promise<Task[]> {
    const userId = req.user.userId;
    return this.taskService.findAllById(userId);
  }

  @ApiOperation({ summary: 'Busca uma tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada', type: Task })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<Task> {
    return this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'Atualiza uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizada', type: Task })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Deleta uma tarefa' })
  @ApiResponse({ status: 204, description: 'Tarefa deletada com sucesso' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
