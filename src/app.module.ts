import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [TaskModule, UsersModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
