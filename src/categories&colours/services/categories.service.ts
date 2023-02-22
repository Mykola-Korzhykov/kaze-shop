import { HttpStatus, Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { ApiException } from '../../common/exceptions/api.exception';
import { ReturnedCategory } from '../../core/interfaces/product.interfaces';
import {
  ALREADY_EXIST_CATEGORY,
  NOT_FOUND_CATEGORY,
} from '../category.colour.constants';
import { CreateCategoryDto } from '../dto/create.category.dto';
import { UpdateCategoryDto } from '../dto/update.category.dto';
import { Category } from '../models/category.model';

@Injectable({ scope: Scope.REQUEST })
export class CategoriesService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}

  async getCategoryByValue(value: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { ua: value },
    });
    if (!category) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_CATEGORY,
      );
    }
    return category;
  }

  async getCategoriesByIds(categoryIds: number[]): Promise<Category[]> {
    const category = await this.categoryRepository.findAll({
      where: {
        id: categoryIds,
      },
    });
    if (category.length === 0 || !category) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_CATEGORY,
      );
    }
    return category;
  }

  async getCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findByPk(categoryId);
    if (!category) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_CATEGORY,
      );
    }
    return category;
  }

  async getCategories(): Promise<ReturnedCategory[]> {
    const categories = await this.categoryRepository.findAll();
    return categories.map((category) => {
      return {
        id: category.id,
        ua: category.ua,
        en: category.en,
        rs: category.rs,
        ru: category.ru,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      };
    });
  }

  async createCategory(
    categoryDto: CreateCategoryDto,
  ): Promise<ReturnedCategory> {
    const isExist = await this.categoryRepository.findOne({
      where: {
        ua: categoryDto.ua,
        en: categoryDto.en,
        rs: categoryDto.rs,
        ru: categoryDto.ru,
      },
    });
    if (isExist) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        ALREADY_EXIST_CATEGORY,
      );
    }
    const category = await this.categoryRepository.create({ ...categoryDto });
    return {
      id: category.id,
      ua: category.ua,
      en: category.en,
      rs: category.rs,
      ru: category.ru,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }

  async deleteCategory(categoryId: number): Promise<number> {
    const isExist = await this.categoryRepository.findByPk(categoryId);
    if (!isExist) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_CATEGORY,
      );
    }
    const deleted = await this.categoryRepository.destroy({
      where: {
        id: isExist.id,
        ua: isExist.ua,
        en: isExist.en,
        rs: isExist.rs,
        ru: isExist.ru,
      },
    });
    return deleted;
  }

  async updateCategory(
    categoryId: number,
    updateDto: UpdateCategoryDto,
  ): Promise<ReturnedCategory> {
    const isExist = await this.categoryRepository.findByPk(categoryId);
    if (!isExist) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_CATEGORY,
      );
    }
    isExist.ua = updateDto.ua;
    isExist.ru = updateDto.ru;
    isExist.rs = updateDto.rs;
    isExist.en = updateDto.en;
    await isExist.save();
    const category = await this.categoryRepository.findOne({
      where: {
        id: isExist.id,
        ua: isExist.ua,
        en: isExist.en,
        rs: isExist.rs,
        ru: isExist.ru,
      },
    });
    return {
      id: category.id,
      ua: category.ua,
      en: category.en,
      rs: category.rs,
      ru: category.ru,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
  }
}
