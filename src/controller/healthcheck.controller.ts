import { Controller, Get } from '@nestjs/common';

import { HealthcheckService } from 'src/service/healthcheck.service';

@Controller('api/')
export class HealthcheckController {

  constructor(
    private healthcheckService: HealthcheckService
  ) {}

  @Get('healthcheck')
  findAll() {
    return this.healthcheckService.findAll();
  }

}