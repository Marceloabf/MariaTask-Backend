import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título da tarefa', example: 'Implementar autenticação JWT' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descrição detalhada da tarefa', example: 'Precisamos adicionar JWT ao sistema para autenticação segura.' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Status da tarefa', example: 'PENDING', enum: ['PENDING', 'IN_PROGRESS', 'DONE'] })
  @IsOptional()
  @IsEnum(['PENDING', 'IN_PROGRESS', 'DONE'])
  status?: string;

  @ApiProperty({ description: 'Data limite da tarefa', example: '2025-03-18T18:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiProperty({ description: 'ID do usuário que criou a tarefa', example: 1 })
  @IsInt()
  userId: number;
}