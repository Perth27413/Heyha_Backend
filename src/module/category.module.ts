import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from 'src/entities/category.entity';
import { CategoryService } from 'src/service/category.service';
import { CategoryController } from 'src/controller/category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}