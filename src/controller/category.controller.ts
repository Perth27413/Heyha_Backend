import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CategoryService } from 'src/service/category.service';
import CategoryResponse from 'src/model/category/CategoryResponse';

@Controller('api/')
export class CategoryController {

  constructor(
    private categoryrService: CategoryService
  ) {}

  @Get('category')
  async getAll(): Promise<Array<CategoryResponse>> {
    return this.categoryrService.getAllCategory()
  }
}