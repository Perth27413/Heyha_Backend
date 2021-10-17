import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Healthcheck } from 'src/entities/healthcheck.entity';

@Injectable()
export class HealthcheckService {

  constructor(
    @InjectRepository(Healthcheck) private healthcheckRepo: Repository<Healthcheck>,
  ) {}

  findAll() {
    return this.healthcheckRepo.find();
  }

}