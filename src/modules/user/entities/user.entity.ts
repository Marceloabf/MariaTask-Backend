import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID único do usuário', example: 1 })
  id: number;

  @Column({ length: 100 })
  @ApiProperty({ description: 'Nome do usuário', example: 'Marcelo Barbosa' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'E-mail do usuário (único)', example: 'marcelo@email.com' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Senha do usuário (hash)', example: '$2b$10$abcdefg1234567890' })
  password: string; 

  @CreateDateColumn()
  @ApiProperty({ description: 'Data de criação do usuário', example: '2025-03-18T18:00:00.000Z' })
  createdAt: Date;
}
