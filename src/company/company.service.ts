import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CompanyDto, CreateCompanyDto, UpdateCompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
  private readonly companies: CompanyDto[] = [];

  create(newCompany: CreateCompanyDto) {
    const company = {
      ...newCompany,
      id: uuid(),
    };
    this.companies.push(company);
    return company;
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

  update(id: string, company: UpdateCompanyDto): CompanyDto {
    const companyIndex = this.companies.findIndex((c) => c.id === id);

    if (companyIndex < 0) {
      throw new HttpException(
        `Company with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingCompany = this.companies[companyIndex];

    const updatedCompany: CompanyDto = {
      ...existingCompany,
      name: company.name ?? existingCompany.name,
      users: company.users ?? existingCompany.users,
      tasks: company.tasks ?? existingCompany.tasks,
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
