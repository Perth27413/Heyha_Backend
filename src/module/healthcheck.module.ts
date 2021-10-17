import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Healthcheck } from 'src/entities/healthcheck.entity';
import { HealthcheckService } from 'src/service/healthcheck.service';
import { HealthcheckController } from 'src/controller/healthcheck.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Healthcheck])
  ],
  providers: [HealthcheckService],
  controllers: [HealthcheckController]
})
export class HealthcheckModule {}