import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserRoleEnum } from 'src/auth/userInterface/user.interface';
import { CompanyDto, CreateCompanyWithAdminDto } from './company.dto';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Post()
  create(@Body() company: CreateCompanyWithAdminDto): CompanyDto {
    return this.companysService.create(company);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get('/:id')
  findById(@Param('id') id: string): CompanyDto {
    return this.companysService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch('/:id')
  update(@Body() user: CompanyDto, @Param('id') id: string): CompanyDto {
    return this.companysService.update(id, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.companysService.remove(id);
  }
}
