import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/db/entities/company.entity';
import { UserEntity } from 'src/db/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, UsersService],
  imports: [TypeOrmModule.forFeature([CompanyEntity, UserEntity])],
})
export class CompanyModule {}
