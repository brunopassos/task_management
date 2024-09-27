import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/db/entities/company.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import {
  CompanyDto,
  CreateCompanyWithAdminDto,
  UpdateCompanyDto,
} from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly userService: UsersService,
  ) {}
  private usersId: string[] = [];

  async create(newCompany: CreateCompanyWithAdminDto): Promise<CompanyDto> {
    const companyAlreadyExists = await this.companyRepository.findOne({
      where: { name: newCompany.name },
    });

    if (companyAlreadyExists) {
      throw new ConflictException(
        `Company ${newCompany.name} already registered!`,
      );
    }

    const companyId = uuid();

    const company = this.companyRepository.create({
      name: newCompany.name,
      id: companyId,
    });

    await this.companyRepository.save(company);

    for (const user of newCompany.users) {
      user.companyId = company.id;
      await this.userService.create(user);
    }

    return company;
  }

  async findById(id: string): Promise<CompanyDto> {
    const foundCompany = await this.companyRepository.findOne({
      where: { id },
    });

    if (foundCompany) {
      return foundCompany[0];
    }

    throw new HttpException(
      `Company with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: string, company: UpdateCompanyDto): Promise<CompanyDto> {
    const foundCompany = await this.companyRepository.findOne({
      where: { id },
    });

    if (!foundCompany) {
      throw new HttpException(
        `Company with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedCompany: CompanyDto = {
      ...foundCompany,
      name: company.name ?? foundCompany.name,
    };

    await this.companyRepository.save(updatedCompany);

    return updatedCompany;
  }

  async remove(id: string) {
    const foundCompany = await this.companyRepository.findOne({
      where: { id },
    });

    if (!foundCompany) {
      throw new HttpException(
        `Comapny with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.companyRepository.delete(id);
  }
}
