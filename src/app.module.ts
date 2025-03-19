import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './modules/task/entities/task.entity';
import { User } from './modules/user/entities/user.entity';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'siricascudo1*', 
      database: 'maria_task',
      entities: [User, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task,User]),
    UserModule,
    TaskModule,
    AuthModule
  ],
})
export class AppModule {}