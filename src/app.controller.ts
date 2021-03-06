import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getSuccess(): string {
    return this.appService.getHello();
  }
}
