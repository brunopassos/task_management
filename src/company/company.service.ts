import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
  private readonly companies: CompanyDto[] = [];

  create(newCompany: CompanyDto) {
    newCompany.id = uuid();
    this.companies.push(newCompany);
    return newCompany;
  }

  findById(id: string): CompanyDto {
    const foundCompany = this.companies.filter((c) => c.id === id);
    if (foundCompany.length) {
      return foundCompany[0];
    }

    throw new HttpException(
      `Company with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(id: string, company: CompanyDto): CompanyDto {
    const companyIndex = this.companies.findIndex((c) => c.id === id);

    if (companyIndex < 0) {
      throw new HttpException(
        `Company with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedCompany: CompanyDto = {
      id,
      name: company.name,
      tasks: company.tasks,
      users: company.users,
    };

    this.companies[companyIndex] = updatedCompany;

    return updatedCompany;
  }

  remove(id: string) {
    const companyIndex = this.companies.findIndex((c) => c.id === id);

    if (companyIndex >= 0) {
      this.companies.splice(companyIndex, 1);
      return;
    }

    throw new HttpException(
      `Comapny with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
}
