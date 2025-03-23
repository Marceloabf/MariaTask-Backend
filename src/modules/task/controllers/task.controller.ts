import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
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
  @ApiResponse({
    status: 201,
    description: 'Tarefa criada com sucesso',
    type: Task,
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req): Promise<Task> {
    const userId = req.user.userId;
    return this.taskService.create(createTaskDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as tarefas do usuário com paginação, ordenação e filtros' })
  async findAllById(
    @Query('userId', ParseIntPipe) userId: number,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('status') status?: string
  ): Promise<{ data: Task[]; total: number; page: number; limit: number }> {
    return this.taskService.findAllById(userId, page, limit, status);
  }

  @ApiOperation({
    summary: 'Retorna a quantidade de tarefas em cada status do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Quantidade de tarefas por status',
    type: Object,
  })
  @Get('reports')
  async getTaskCountByStatus(
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.taskService.getTaskReports(userId);
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
