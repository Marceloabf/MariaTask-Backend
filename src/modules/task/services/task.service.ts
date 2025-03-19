import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  @ApiOperation({ summary: 'Cria uma nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso' })
  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.taskRepository.create({ ...createTaskDto, userId });
    return this.taskRepository.save(task);
  }

  @ApiOperation({ summary: 'Lista todas as tarefas do usuário' })
  async findAllById(userId: number): Promise<Task[]> {
    return this.taskRepository.find({where: {userId}});
  }

  @ApiOperation({ summary: 'Busca uma tarefa por ID' })
  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Tarefa não encontrada');
    return task;
  }

  @ApiOperation({ summary: 'Atualiza uma tarefa' })
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    await this.taskRepository.update(id, updateTaskDto);
    return this.findById(id);
  }

  @ApiOperation({ summary: 'Deleta uma tarefa' })
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
