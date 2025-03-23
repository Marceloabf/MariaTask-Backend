import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    if (!createTaskDto) {
      throw new BadRequestException('Invalid creation data.');
    }
    const task = this.taskRepository.create({ ...createTaskDto, userId });
    return this.taskRepository.save(task);
  }

  @ApiOperation({ summary: 'Lista todas as tarefas do usuário' })
  async findAllById(
    userId: number,
    page: number,
    limit: number,
    status?: string
  ) {
    if (page < 1 || limit < 1) throw new BadRequestException('Invalid pagination params');
    const where: any = { userId };
  
    if (status) {
      where.status = status;
    }
  
    const [data, total] = await this.taskRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  
    return { data, total, page, limit };
  }

  @ApiOperation({ summary: 'Busca uma tarefa por ID' })
  async findById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  @ApiOperation({ summary: 'Retorna a quantidade de tarefas por status do usuário' })
  async getTaskReports(userId: number): Promise<any> {
    const PENDING = await this.taskRepository.count({
      where: { userId, status: 'PENDING' },
    });

    const IN_PROGRESS = await this.taskRepository.count({
      where: { userId, status: 'IN_PROGRESS' },
    });

    const DONE = await this.taskRepository.count({
      where: { userId, status: 'DONE' },
    });

    return { PENDING, IN_PROGRESS, DONE, total: PENDING + IN_PROGRESS + DONE };
  }

  @ApiOperation({ summary: 'Atualiza uma tarefa' })
  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    if (!updateTaskDto) {
      throw new BadRequestException('Invalid update data.');
    }

    await this.taskRepository.update(id, updateTaskDto);
    return this.findById(id);
  }

  @ApiOperation({ summary: 'Deleta uma tarefa' })
  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
