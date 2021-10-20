import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';
import CategoryResponse from 'src/model/category/CategoryResponse';

@Injectable()
export class CategoryService {
  
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  public async getAllCategory(): Promise<Array<CategoryResponse>> {
    let result: Array<CategoryResponse> = []
    let allCategory = await this.categoryRepo.find()
    allCategory.map(category => {
      result.push(this.mapCategoryEntityToCategoryResponse(category))
    })
    return result
  }

  private mapCategoryEntityToCategoryResponse(categoryEntity:Category): CategoryResponse {
    let result: CategoryResponse = {
      id: categoryEntity.id,
      name: categoryEntity.name
    }
    return result
  }

}