import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyDto } from './company.dto';
import { CompanyService } from './company.service';

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
