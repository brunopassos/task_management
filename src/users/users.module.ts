import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { CompanyEntity } from 'src/db/entities/company.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService],
  imports: [TypeOrmModule.forFeature([UserEntity, CompanyEntity])],
})
export class UsersModule {}
