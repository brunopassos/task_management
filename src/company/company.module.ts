import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, UsersService],
})
export class CompanyModule {}
