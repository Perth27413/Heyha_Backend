import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { HealthcheckService } from 'src/service/healthcheck.service';

@Controller('api/')
export class HealthcheckController {

  constructor(
    private healthcheckService: HealthcheckService
  ) {}

  @Get()
  findAll() {
    return this.healthcheckService.findAll();
  }

}