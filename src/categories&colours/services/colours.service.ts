import { HttpStatus, Injectable } from '@nestjs/common';
import { Scope } from '@nestjs/common/interfaces';
import { InjectModel } from '@nestjs/sequelize';
import { ApiException } from '../../common/exceptions/api.exception';
import { ReturnedColour } from '../../core/interfaces/product.interfaces';
import {
  ALREADY_EXIST_COLOUR,
  NOT_FOUND_COLOUR,
} from '../category.colour.constants';
import { CreateColourDto } from '../dto/create.colour.dto';
import { UpdateColourDto } from '../dto/update.colour.dto';
import { Colour } from '../models/colours.model';

@Injectable({ scope: Scope.REQUEST })
export class ColoursService {
  constructor(
    @InjectModel(Colour) private readonly colourRepository: typeof Colour,
  ) {}

  async setColours(): Promise<Colour[]> {
    const colours = await this.colourRepository.bulkCreate([
      { ru: 'Бежевый', rs: '', en: '', ua: '', hex: '#FFE4C4' },
      { ru: 'Капучинный', rs: '', en: '', ua: '', hex: '#9F8E84' },
      { ru: 'Синий', rs: '', en: '', ua: '', hex: '#000080' },
      { ru: 'Голубой', rs: '', en: '', ua: '', hex: '#A6BEE5' },
      { ru: 'Коричневый', rs: '', en: '', ua: '', hex: '#0B0B0B' },
      { ru: 'Изумрудный', rs: '', en: '', ua: '', hex: '#24514C' },
      { ru: 'Розовый', rs: '', en: '', ua: '', hex: '#FFC0CB' },
      { ru: 'Фиолетовый', rs: '', en: '', ua: '', hex: '#800080' },
      { ru: 'Черный', rs: '', en: '', ua: '', hex: '#0B0B0B' },
      { ru: 'Оливковый', rs: '', en: '', ua: '', hex: '#829E86' },
      { ru: 'Белый', rs: '', en: '', ua: '', hex: '#fff' },
      { ru: 'Серый', rs: '', en: '', ua: '', hex: '#808080' },
      { ru: 'Графитовый', rs: '', en: '', ua: '', hex: '#525A5B' },
      { ru: 'Пудровый', rs: '', en: '', ua: '', hex: '#F2E2D8' },
    ]);
    return colours;
  }

  async getColourByValue(value: string): Promise<Colour> {
    const colour = await this.colourRepository.findOne({
      where: { ua: value },
    });
    if (!colour) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_COLOUR,
      );
    }
    return colour;
  }

  async getColoursByIds(colourIds: number[]): Promise<Colour[]> {
    const colour = await this.colourRepository.findAll({
      where: {
        id: colourIds,
      },
    });
    if (colour.length === 0 || !colour) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_COLOUR,
      );
    }
    return colour;
  }

  async getColourById(colourId: number): Promise<Colour> {
    const colour = await this.colourRepository.findByPk(colourId);
    if (!colour) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_COLOUR,
      );
    }
    return colour;
  }

  async getColours(): Promise<ReturnedColour[]> {
    const categories = await this.colourRepository.findAll();
    return categories.map((colour) => {
      return {
        id: colour.id,
        ua: colour.ua,
        en: colour.en,
        rs: colour.rs,
        ru: colour.ru,
        hex: colour.hex,
        type: 'colour',
        createdAt: colour.createdAt,
        updatedAt: colour.updatedAt,
      };
    });
  }

  async createColour(colourDto: CreateColourDto): Promise<ReturnedColour> {
    const isExist = await this.colourRepository.findOne({
      where: {
        ua: colourDto.ua,
        en: colourDto.en,
        rs: colourDto.rs,
        ru: colourDto.ru,
        hex: colourDto.hex,
      },
    });
    if (isExist) {
      throw new ApiException(
        HttpStatus.BAD_REQUEST,
        'Bad request',
        ALREADY_EXIST_COLOUR,
      );
    }
    const colour = await this.colourRepository.create({ ...colourDto });
    return {
      id: colour.id,
      ua: colour.ua,
      en: colour.en,
      rs: colour.rs,
      ru: colour.ru,
      hex: colour.hex,
      type: 'colour',
      createdAt: colour.createdAt,
      updatedAt: colour.updatedAt,
    };
  }

  async deleteColour(colourId: number): Promise<number> {
    const isExist = await this.colourRepository.findByPk(colourId);
    if (!isExist) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_COLOUR,
      );
    }
    const deleted = await this.colourRepository.destroy({
      where: {
        id: isExist.id,
        ua: isExist.ua,
        en: isExist.en,
        rs: isExist.rs,
        ru: isExist.ru,
        hex: isExist.hex,
      },
    });
    return deleted;
  }

  async updateColour(
    colourId: number,
    updateDto: UpdateColourDto,
  ): Promise<ReturnedColour> {
    const isExist = await this.colourRepository.findByPk(colourId);
    if (!isExist) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        NOT_FOUND_COLOUR,
      );
    }
    isExist.ua = updateDto.ua;
    isExist.ru = updateDto.ru;
    isExist.rs = updateDto.rs;
    isExist.en = updateDto.en;
    isExist.hex = updateDto.hex;
    await isExist.save();
    const colour = await this.colourRepository.findOne({
      where: {
        id: isExist.id,
        ua: isExist.ua,
        en: isExist.en,
        rs: isExist.rs,
        ru: isExist.ru,
      },
    });
    return {
      id: colour.id,
      ua: colour.ua,
      en: colour.en,
      rs: colour.rs,
      ru: colour.ru,
      hex: colour.hex,
      type: 'colour',
      createdAt: colour.createdAt,
      updatedAt: colour.updatedAt,
    };
  }
}
