import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
})
export class UsersModule {}
