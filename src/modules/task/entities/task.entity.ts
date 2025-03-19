import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity'
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único da tarefa', example: 1 })
  id: number;

  @Column({ length: 200 })
  @ApiProperty({ description: 'Título da tarefa', example: 'Implementar autenticação JWT' })
  title: string;

  @Column('text')
  @ApiProperty({ description: 'Descrição detalhada da tarefa', example: 'Precisamos adicionar JWT ao sistema para autenticação segura.' })
  description: string;

  @Column({ default: 'PENDING' })
  @ApiProperty({ description: 'Status da tarefa', example: 'PENDING', enum: ['PENDING', 'IN_PROGRESS', 'DONE'] })
  status: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação da tarefa', example: '2025-03-18T18:00:00.000Z' })
  createdAt: Date;

  @CreateDateColumn()
  @ApiProperty({ description: 'Data limite da tarefa', example: '2025-03-18T18:00:00.000Z' })
  dueDate: Date;

  @Column()
  @ApiProperty({ description: 'ID do usuário que criou a tarefa', example: 1 })
  userId: number;
}