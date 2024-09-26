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
import { CompanyDto } from './company.dto';
import { CompanyService } from './company.service';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private readonly companysService: CompanyService) {}

  @Post()
  create(@Body() company: CompanyDto): CompanyDto {
    return this.companysService.create(company);
  }

  @Get('/:id')
  findById(@Param('id') id: string): CompanyDto {
    return this.companysService.findById(id);
  }

  @Patch('/:id')
  update(@Body() user: CompanyDto, @Param('id') id: string): CompanyDto {
    return this.companysService.update(id, user);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.companysService.remove(id);
  }
}
