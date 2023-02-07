import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create.category.dto';
import { Category } from './models/category.model';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  async getCategoryByValue(value: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { value: value } });
    return category;
  }

  async getCategories(): Promise<
    {
      title: string;
      description: string;
      createdAt: any;
      updatedAt: any;
    }[]
  > {
    const categories = await this.categoryRepository.findAll();
    return categories.map((category) => {
      return {
        title: category.title,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    });
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<{
    title: string;
    description: string;
  }> {
    const isExist = await this.categoryRepository.findOne({
      where: {
        title: categoryDto.title,
        description: categoryDto.description,
      },
    });
    if (isExist) {
      throw new BadRequestException('Category already exist!');
    }
    const category = await this.categoryRepository.create({ ...categoryDto });
    return {
      title: category.title,
      description: category.description,
    };
  }

  async deleteCategory(categoryId: number): Promise<number> {
    const isExist = await this.categoryRepository.findByPk(categoryId);
    if (!isExist) {
      throw new NotFoundException('Category not found!');
    }
    const deleted = await this.categoryRepository.destroy({
      where: {
        title: isExist.title,
        description: isExist.description,
      },
    });
    return deleted;
  }
}
