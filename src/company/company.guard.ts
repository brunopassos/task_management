import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CompanyService } from './company.service';

@Injectable()
export class CompanyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly companyService: CompanyService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.company) {
      throw new UnauthorizedException(
        'User is not associated with any company',
      );
    }

    const companyExists = this.companyService.findById(user.company);
    if (!companyExists) {
      throw new UnauthorizedException('Company does not exist or is invalid');
    }

    return true;
  }
}
