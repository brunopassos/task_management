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
  async create(
    @Body() company: CreateCompanyWithAdminDto,
  ): Promise<CompanyDto> {
    return await this.companysService.create(company);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<CompanyDto> {
    return await this.companysService.findById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Patch('/:id')
  async update(
    @Body() user: CompanyDto,
    @Param('id') id: string,
  ): Promise<CompanyDto> {
    return await this.companysService.update(id, user);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.companysService.remove(id);
  }
}
