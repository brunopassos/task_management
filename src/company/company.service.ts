import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { v4 as uuid } from 'uuid';
import {
  CompanyDto,
  CreateCompanyWithAdminDto,
  UpdateCompanyDto,
} from './company.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly userService: UsersService) {}
  private readonly companies: CompanyDto[] = [];
  private usersId: string[] = [];

  create(newCompany: CreateCompanyWithAdminDto): CompanyDto {
    const companyId = uuid();

    newCompany.users.forEach((u) => {
      u.company = companyId;
      const user = this.userService.create(u);
      this.usersId.push(user.id);
    });

    const company = {
      ...newCompany,
      id: companyId,
      users: this.usersId ?? [],
      tasks: [],
    };

    this.companies.push(company);

    return company;
  }

  // create(newCompany: CreateCompanyDto): CompanyDto {
  //   const company = {
  //     ...newCompany,
  //     id: uuid(),
  //   };
  //   this.companies.push(company);
  //   return company;
  // }

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
