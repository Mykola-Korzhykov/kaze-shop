import { HttpStatus, Injectable, Logger, Scope } from '@nestjs/common';
import {
  FILE_NOT_FOUND,
  NOT_AUTHORIZED,
  NO_IMAGES_PROVIDED,
  PRODUCTS_NOT_FOUND,
  PRODUCT_NOT_FOUND,
} from './product.constants';
import { InjectModel } from '@nestjs/sequelize';
import { unlink, existsSync, readdirSync, rmSync } from 'fs';
import { join } from 'path';
import { AdminService } from '../admin/services/admin.service';
import { Category } from '../categories&colours/models/category.model';
import { ApiException } from '../common/exceptions/api.exception';
import { ReturnedProduct } from '../core/interfaces/product.interfaces';
import { OwnerService } from '../owner/services/owner.service';
import { CategoriesService } from '../categories&colours/services/categories.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './models/product.model';
import { UsersService } from '../users/services/users.service';
import { USER_NOT_FOUND } from '../users/constants/user.constants';
import { NextFunction, Request, Response } from 'express';
import { QueryFilterDto } from './dto/query-filter.dto';
import { Colour } from '../categories&colours/models/colours.model';
import { ColoursService } from '../categories&colours/services/colours.service';
@Injectable({ scope: Scope.TRANSIENT })
export class ProductService {
  private readonly Logger = new Logger(ProductService.name);
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    private readonly ownerService: OwnerService,
    private readonly userService: UsersService,
    private readonly adminService: AdminService,
    private readonly categoriesService: CategoriesService,
    private readonly coloursService: ColoursService,
  ) {}

  async getCompareProducts(
    request: Request,
    response: Response,
    next: NextFunction,
    page: number,
    pageSize: number,
    categories: number[] | undefined,
  ) {
    try {
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      let products = await this.productRepository.findAll({
        include: { all: true },
      });
      if (categories && categories.length > 0) {
        products = products.filter((product: Product) => {
          if (
            product.categories.some(
              (category: Category) =>
                !categories
                  .map((category) => Number(category))
                  .includes(category.id),
            )
          ) {
            return product;
          }
        });
      }
      return response.json({
        products: products
          .map((product: Product) => {
            return {
              id: product.id,
              title: product.getTitle(),
              description: product.getDescription(),
              price:
                Math.round(product.price * currency.rate) + currency.symbol,
              quantity: product.quantity,
              images: product.images.map((image) => JSON.parse(image)),
              hexes: product.hexes,
              sizeChartImage: product.sizeChartImage,
              sizes: product.sizes,
              colours: product.colours.map((colour) => {
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
              }),
              categories: product?.categories?.map((category) => {
                return {
                  id: category.id,
                  ua: category.ua,
                  en: category.en,
                  rs: category.rs,
                  ru: category.ru,
                  type: 'category',
                  createdAt: category.createdAt,
                  updatedAt: category.updatedAt,
                };
              }),
              reviews: product.reviews.map((review) => {
                return {
                  id: review.id,
                  name: review.name,
                  surname: review.surname,
                  review: review.review,
                  createdAt: review.createdAt,
                  updatedAt: review.updatedAt,
                };
              }),
            };
          })
          .slice((page - 1) * pageSize, pageSize * page),
        totalProducts: products.length,
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getProductsByCategory(
    request: Request,
    response: Response,
    next: NextFunction,
    page: number,
    pageSize: number,
    categories: number[] | undefined,
  ) {
    try {
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      let products = await this.productRepository.findAll({
        include: { all: true },
      });
      if (categories && categories.length > 0) {
        products = products.filter((product: Product) => {
          if (
            product.categories.some((category: Category) =>
              categories
                .map((category) => Number(category))
                .includes(category.id),
            )
          ) {
            return product;
          }
        });
      }
      return response.json({
        products: products
          .map((product: Product) => {
            return {
              id: product.id,
              title: product.getTitle(),
              description: product.getDescription(),
              price:
                Math.round(product.price * currency.rate) + currency.symbol,
              quantity: product.quantity,
              images: product.images.map((image) => JSON.parse(image)),
              hexes: product.hexes,
              sizeChartImage: product.sizeChartImage,
              sizes: product.sizes,
              colours: product.colours.map((colour) => {
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
              }),
              categories: product?.categories?.map((category) => {
                return {
                  id: category.id,
                  ua: category.ua,
                  en: category.en,
                  rs: category.rs,
                  ru: category.ru,
                  type: 'category',
                  createdAt: category.createdAt,
                  updatedAt: category.updatedAt,
                };
              }),
              reviews: product.reviews.map((review) => {
                return {
                  id: review.id,
                  name: review.name,
                  surname: review.surname,
                  review: review.review,
                  createdAt: review.createdAt,
                  updatedAt: review.updatedAt,
                };
              }),
            };
          })
          .slice((page - 1) * pageSize, pageSize * page),
        totalProducts: products.length,
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getBookmarks(
    request: Request,
    response: Response,
    next: NextFunction,
    page: number,
    productPerPage: number,
    userId: number,
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          USER_NOT_FOUND,
        );
      }
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      const products = user.bookmarks
        .slice((page - 1) * productPerPage, productPerPage * page)
        .map((product) => {
          return {
            id: product.id,
            title: product.getTitle(),
            description: product.getDescription(),
            price: product.price * currency.rate + currency.symbol,
            quantity: product.quantity,
            images: product.images.map((image) => JSON.parse(image)),
            hexes: product.hexes,
            sizeChartImage: product.sizeChartImage,
            sizes: product.sizes,
            colours: product.colours.map((colour) => {
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
            }),
            categories: product?.categories?.map((category) => {
              return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              };
            }),
            reviews: product.reviews.map((review) => {
              return {
                id: review.id,
                name: review.name,
                surname: review.surname,
                review: review.review,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
              };
            }),
          };
        });
      return response.json({
        products: products,
        totalProducts: user.bookmarks.length,
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getWatchedProducts(
    request: Request,
    response: Response,
    next: NextFunction,
    page: number,
    productPerPage: number,
    userId: number,
  ) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          USER_NOT_FOUND,
        );
      }
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      const products = user.watched
        .slice((page - 1) * productPerPage, productPerPage * page)
        .map((product) => {
          return {
            id: product.id,
            title: product.getTitle(),
            description: product.getDescription(),
            price: product.price * currency.rate + currency.symbol,
            quantity: product.quantity,
            images: product.images.map((image) => JSON.parse(image)),
            hexes: product.hexes,
            sizeChartImage: product.sizeChartImage,
            sizes: product.sizes,
            colours: product.colours.map((colour) => {
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
            }),
            categories: product?.categories?.map((category) => {
              return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              };
            }),
            reviews: product.reviews.map((review) => {
              return {
                id: review.id,
                name: review.name,
                surname: review.surname,
                review: review.review,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
              };
            }),
          };
        });
      return response.json({
        products: products,
        totalProducts: user.bookmarks.length,
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getProductsByIds(
    request: Request,
    response: Response,
    next: NextFunction,
    productIds: number[],
    page: number,
    productPerPage: number,
  ) {
    try {
      const totalCount = await this.productRepository.count();
      const products = await this.productRepository.findAll({
        include: { all: true },
        offset: (page - 1) * productPerPage,
        limit: productPerPage,
        where: {
          id: productIds,
        },
      });
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      const returnedProducts = products.map((product) => {
        return {
          id: product.id,
          title: product.getTitle(),
          description: product.getDescription(),
          price: product.price * currency.rate + currency.symbol,
          quantity: product.quantity,
          images: product.images.map((image) => JSON.parse(image)),
          hexes: product.hexes,
          sizeChartImage: product.sizeChartImage,
          sizes: product.sizes,
          colours: product.colours.map((colour) => {
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
          }),
          categories: product?.categories?.map((category) => {
            return {
              id: category.id,
              ua: category.ua,
              en: category.en,
              rs: category.rs,
              ru: category.ru,
              type: 'category',
              createdAt: category.createdAt,
              updatedAt: category.updatedAt,
            };
          }),
          reviews: product.reviews.map((review) => {
            return {
              id: review.id,
              name: review.name,
              surname: review.surname,
              review: review.review,
              createdAt: review.createdAt,
              updatedAt: review.updatedAt,
            };
          }),
        };
      });
      return response.json({
        products: returnedProducts,
        totalProducts: totalCount,
      });
    } catch (err: unknown) {
      this.Logger.error(err);
      return next(err);
    }
  }

  async getProducts(
    request: Request,
    response: Response,
    next: NextFunction,
    page: number,
    productPerPage: number,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const totalCount = await this.productRepository.count();
      const products = await this.productRepository.findAll({
        include: { all: true },
        order: [['updatedAt', 'DESC']],
      });
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      const returnedProducts = products
        .map((product) => {
          return {
            id: product.id,
            title: product.getTitle(),
            description: product.getDescription(),
            price: product.price * currency.rate + currency.symbol,
            quantity: product.quantity,
            images: product.images.map((image) => JSON.parse(image)),
            hexes: product.hexes,
            sizeChartImage: product.sizeChartImage,
            sizes: product.sizes,
            colours: product.colours.map((colour) => {
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
            }),
            categories: product?.categories?.map((category) => {
              return {
                id: category.id,
                ua: category.ua,
                en: category.en,
                rs: category.rs,
                ru: category.ru,
                type: 'category',
                createdAt: category.createdAt,
                updatedAt: category.updatedAt,
              };
            }),
            reviews: product.reviews.map((review) => {
              return {
                id: review.id,
                name: review.name,
                surname: review.surname,
                review: review.review,
                createdAt: review.createdAt,
                updatedAt: review.updatedAt,
              };
            }),
          };
        })
        .slice((page - 1) * productPerPage, productPerPage * page);
      return response.json({
        products: returnedProducts,
        totalProducts: totalCount,
      });
    } catch (error) {
      this.Logger.error(error);
      return next(
        new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCTS_NOT_FOUND,
        ),
      );
    }
  }

  async getProductById(
    request: Request,
    response: Response,
    next: NextFunction,
    productId: number,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      const product = await this.productRepository.findByPk(productId, {
        include: {
          all: true,
        },
      });
      if (!product) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCT_NOT_FOUND,
        );
      }
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      return response.json({
        id: product.id,
        title: product.getTitle(),
        description: product.getDescription(),
        price: Math.floor(product.price * currency.rate) + currency.symbol,
        quantity: product.quantity,
        images: product.images.map((image) => JSON.parse(image)),
        sizeChartImage: product.sizeChartImage,
        sizes: product.sizes,
        hexes: product.hexes,
        colours: product.colours.map((colour) => {
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
        }),
        categories: product?.categories?.map((category) => {
          return {
            id: category.id,
            ua: category.ua,
            en: category.en,
            rs: category.rs,
            ru: category.ru,
            type: 'category',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          };
        }),
        reviews: product.reviews.map((review) => {
          return {
            id: review.id,
            name: review.name,
            surname: review.surname,
            review: review.review,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
          };
        }),
      });
    } catch (err) {
      this.Logger.error(err);
      return next(
        new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCTS_NOT_FOUND,
        ),
      );
    }
  }

  async filterProducts(
    request: Request,
    response: Response,
    next: NextFunction,
    queryFilterDto: QueryFilterDto,
  ): Promise<void | Response<any, Record<string, any>>> {
    try {
      let products = await this.productRepository.findAll({
        include: { all: true },
      });
      if (queryFilterDto.order && queryFilterDto.order === 'ASC') {
        products.sort((firstProduct: Product, secondProduct) => {
          return firstProduct.price - secondProduct.price;
        });
      }
      if (queryFilterDto.order && queryFilterDto.order === 'DESC') {
        products.sort((firstProduct: Product, secondProduct) => {
          return secondProduct.price - firstProduct.price;
        });
      }
      if (queryFilterDto.categories && queryFilterDto.categories.length > 0) {
        products = products.filter((product: Product) => {
          if (
            product.categories.some((category: Category) =>
              queryFilterDto.categories.includes(category.id),
            )
          ) {
            return product;
          }
        });
      }
      if (queryFilterDto.sizes && queryFilterDto.sizes.length > 0) {
        products = products.filter((product: Product) => {
          if (
            product.sizes.some((size: string) =>
              queryFilterDto.sizes.includes(size),
            )
          ) {
            return product;
          }
        });
      }
      if (queryFilterDto.colours && queryFilterDto.colours.length > 0) {
        products = products.filter((product: Product) => {
          if (
            product.colours.some((colour: Colour) =>
              queryFilterDto.colours.includes(colour.id),
            )
          ) {
            return product;
          }
        });
      }
      const currency: {
        currencyCode: string;
        symbol: string;
        rate: number;
      } = request['currency'];
      return response.json({
        products: products
          .map((product: Product) => {
            return {
              id: product.id,
              title: product.getTitle(),
              description: product.getDescription(),
              price:
                Math.round(product.price * currency.rate) + currency.symbol,
              quantity: product.quantity,
              images: product.images.map((image) => JSON.parse(image)),
              hexes: product.hexes,
              sizeChartImage: product.sizeChartImage,
              sizes: product.sizes,
              colours: product.colours.map((colour) => {
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
              }),
              categories: product?.categories?.map((category) => {
                return {
                  id: category.id,
                  ua: category.ua,
                  en: category.en,
                  rs: category.rs,
                  ru: category.ru,
                  type: 'category',
                  createdAt: category.createdAt,
                  updatedAt: category.updatedAt,
                };
              }),
              reviews: product.reviews.map((review) => {
                return {
                  id: review.id,
                  name: review.name,
                  surname: review.surname,
                  review: review.review,
                  createdAt: review.createdAt,
                  updatedAt: review.updatedAt,
                };
              }),
            };
          })
          .slice(
            (queryFilterDto.page - 1) * queryFilterDto.pageSize,
            queryFilterDto.pageSize * queryFilterDto.page,
          ),
        totalProducts: products.length,
      });
    } catch (error) {
      this.Logger.error(error);
      return next(
        new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCTS_NOT_FOUND,
        ),
      );
    }
  }

  async addWatchedProduct(productId: number, userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          USER_NOT_FOUND,
        );
      }
      const product = await this.findById(productId);
      if (!user.watched || user.watched.length === 0) {
        user.$set('watched', product.id);
        user.watched = [product];
      } else {
        user.$add('watched', product.id);
      }
      await user.save();
      return productId;
    } catch (err) {
      this.Logger.error(err);
      throw err;
    }
  }

  async addBookmarkProduct(productId: number, userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          USER_NOT_FOUND,
        );
      }
      const product = await this.findById(productId);
      if (!user.bookmarks || user.bookmarks.length === 0) {
        user.$set('bookmarks', product.id);
        user.bookmarks = [product];
      } else {
        user.$add('bookmarks', product.id);
      }
      await user.save();
      return productId;
    } catch (err) {
      this.Logger.error(err);
      throw err;
    }
  }

  async createProduct(
    createProductDto: CreateProductDto,
    userId: number,
    type: 'OWNER' | 'ADMIN' | null,
    images: Express.Multer.File[],
    sizeChartImage: Express.Multer.File[],
  ): Promise<ReturnedProduct> {
    try {
      if (!type && !userId) {
        throw new ApiException(
          HttpStatus.UNAUTHORIZED,
          'Unathorized!',
          NOT_AUTHORIZED,
        );
      }
      if (
        !images ||
        images.length === 0 ||
        !sizeChartImage ||
        sizeChartImage.length === 0
      ) {
        throw new ApiException(
          HttpStatus.BAD_REQUEST,
          'Bad request',
          NO_IMAGES_PROVIDED,
        );
      }
      const sizeChartImagePath =
        '/' +
        sizeChartImage[0].path
          .split('\\')
          .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
          .join('/');
      const product = await this.productRepository.create({
        ...createProductDto,
        title: JSON.stringify(createProductDto.title),
        description: JSON.stringify(createProductDto.description),
        sizeChartImage: sizeChartImagePath,
      });
      product.reviews = [];
      // tslint:disable-next-line: await-promise
      for await (const category of createProductDto.categories) {
        const productCategory = await this.categoriesService.getCategoryById(
          Number(category),
        );
        if (!product.categories) {
          product.$add('categories', productCategory.id);
          product.categories = [productCategory];
        } else {
          product.$add('categories', productCategory.id);
        }
        await product.save();
      }
      // tslint:disable-next-line: await-promise
      for await (const colour of createProductDto.colours) {
        const productColour = await this.coloursService.getColourById(
          Number(colour),
        );
        if (!product.colours) {
          product.$add('colours', productColour.id);
          product.colours = [productColour];
        } else {
          product.$add('colours', productColour.id);
        }
        if (!product.hexes) {
          product.hexes = [productColour.hex];
        } else {
          product.hexes.push(productColour.hex);
        }
        await product.save();
      }
      const IMAGES: string[] = [];
      // tslint:disable-next-line: await-promise
      for await (const IMAGE of createProductDto.selectedImages) {
        const colour = await this.coloursService.getColourById(
          Number(IMAGE.colourId),
        );
        const imagesPaths: string[] = [];
        IMAGE.fileNames.forEach((fileName: string) => {
          const imagePath = images.filter((image: Express.Multer.File) => {
            return image.originalname === fileName;
          });
          imagePath.forEach((image: Express.Multer.File) => {
            imagesPaths.push(image.path);
          });
        });
        IMAGES.push(
          JSON.stringify({
            imagesPaths: imagesPaths.map((path: string) => {
              return path
                .split('\\')
                .slice(path.split('\\').indexOf('products'))
                .join('/');
            }),
            sizes: IMAGE.sizes,
            colour: {
              id: colour.id,
              ua: colour.ua,
              en: colour.en,
              rs: colour.rs,
              ru: colour.ru,
              hex: colour.hex,
              type: 'colour',
              createdAt: colour.createdAt,
              updatedAt: colour.updatedAt,
            },
          }),
        );
      }
      product.images = IMAGES;
      await product.save();
      if (type && type === 'OWNER') {
        const owner = await this.ownerService.getOwnerById(userId);
        product.setOwnerId(userId);
        product.$set('owner', userId);
        product.owner = owner;
        owner.$add('products', product.id);
        owner.addProduct(product);
        await Promise.all([await product.save(), await owner.save()]);
      }
      if (type && type === 'ADMIN') {
        product.setAdminId(userId);
        product.$set('admin', userId);
        const admin = await this.adminService.getAdminById(userId);
        product.admin = admin;
        admin.$add('products', product.id);
        admin.addProduct(product);
        await Promise.all([await product.save(), await admin.save()]);
      }
      await product.save();
      const dbProduct = await this.findById(product.id);
      const Product = {
        id: dbProduct.id,
        title: dbProduct.getTitle(),
        description: dbProduct.getDescription(),
        price: dbProduct.price,
        quantity: dbProduct.quantity,
        images: dbProduct.images.map((image) => JSON.parse(image)),
        sizeChartImage: dbProduct.sizeChartImage,
        sizes: dbProduct.sizes,
        colours: dbProduct.colours.map((colour) => {
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
        }),
        categories: dbProduct?.categories?.map((category) => {
          return {
            id: category.id,
            ua: category.ua,
            en: category.en,
            rs: category.rs,
            ru: category.ru,
            type: 'category',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          };
        }),
        reviews: dbProduct.reviews.map((review) => {
          return {
            id: review.id,
            name: review.name,
            surname: review.surname,
            review: review.review,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
          };
        }),
      };
      return Product;
    } catch (error) {
      this.Logger.error(error);
      throw error;
    }
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    productId: number,
    userId: number,
    type: 'OWNER' | 'ADMIN' | null,
    images: Express.Multer.File[],
    sizeChartImage: Express.Multer.File[],
  ): Promise<ReturnedProduct> {
    try {
      const existingProduct = await this.productRepository.findByPk(productId, {
        include: { all: true },
      });
      if (!existingProduct) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCT_NOT_FOUND,
        );
      }
      if (type && type === 'OWNER') {
        existingProduct.setOwnerId(userId);
      }
      if (type && type === 'ADMIN' && !existingProduct.getAdminId()) {
        setTimeout(async () => {
          existingProduct.setAdminId(userId);
          existingProduct.$set('admin', userId);
          const admin = await this.adminService.getAdminById(userId);
          existingProduct.admin = admin;
          admin.$add('products', existingProduct.id);
          admin.addProduct(existingProduct);
          await Promise.all([await existingProduct.save(), await admin.save()]);
        }, 0);
      }
      existingProduct.setTitle(updateProductDto.title);
      existingProduct.setDescription(updateProductDto.description);
      existingProduct.quantity = updateProductDto.quantity;
      existingProduct.price = updateProductDto.price;
      existingProduct.sizes = [...updateProductDto.sizes];
      existingProduct.hexes = [];
      for (const category of existingProduct.categories) {
        existingProduct.$remove('categories', category.id);
        await existingProduct.save();
      }
      for (const category of updateProductDto.categories) {
        const existingProductCategory =
          await this.categoriesService.getCategoryById(Number(category));
        if (!existingProduct.categories) {
          existingProduct.$add('categories', existingProductCategory.id);
          existingProduct.categories = [existingProductCategory];
        } else {
          existingProduct.$add('categories', existingProductCategory.id);
        }
        await existingProduct.save();
      }
      for (const colour of existingProduct.colours) {
        existingProduct.$remove('colours', colour.id);
        await existingProduct.save();
      }
      for (const colour of updateProductDto.colours) {
        const existingProductColour = await this.coloursService.getColourById(
          Number(colour),
        );
        if (!existingProduct.colours) {
          existingProduct.$add('colours', existingProductColour.id);
          existingProduct.colours = [existingProductColour];
        } else {
          existingProduct.$add('colours', existingProductColour.id);
        }
        if (!existingProduct.hexes) {
          existingProduct.hexes = [existingProductColour.hex];
        } else {
          existingProduct.hexes.push(existingProductColour.hex);
        }
        await existingProduct.save();
      }
      const IMAGES: string[] = [];
      // tslint:disable-next-line: await-promise
      for await (const IMAGE of updateProductDto.selectedImages) {
        const colour = await this.coloursService.getColourById(
          Number(IMAGE.colourId),
        );
        const imagesPaths: string[] = [];
        IMAGE.fileNames.forEach((fileName: string) => {
          const imagePath = images.filter((image: Express.Multer.File) => {
            return image.originalname === fileName;
          });
          imagePath.forEach((image: Express.Multer.File) => {
            imagesPaths.push(image.path);
          });
        });
        IMAGES.push(
          JSON.stringify({
            imagesPaths: imagesPaths.map((path: string) => {
              return path
                .split('\\')
                .slice(path.split('\\').indexOf('products'))
                .join('/');
            }),
            sizes: IMAGE.sizes,
            colour: {
              id: colour.id,
              ua: colour.ua,
              en: colour.en,
              rs: colour.rs,
              ru: colour.ru,
              hex: colour.hex,
              type: 'colour',
              createdAt: colour.createdAt,
              updatedAt: colour.updatedAt,
            },
          }),
        );
      }
      existingProduct.images = IMAGES;
      await existingProduct.save();
      if (sizeChartImage && sizeChartImage.length > 0) {
        const sizeChartImagePath =
          '/' +
          sizeChartImage[0].path
            .split('\\')
            .slice(sizeChartImage[0].path.split('\\').indexOf('products'))
            .join('/');
        const file = join(__dirname, 'static' + existingProduct.sizeChartImage);
        if (existsSync(file)) {
          unlink(file, (err) => {
            if (err) {
              this.Logger.error(err.message);
            }
          });
        }
        existingProduct.sizeChartImage = sizeChartImagePath;
      }
      await existingProduct.save();
      const dbProduct = await this.findById(existingProduct.id);
      const Product = {
        id: dbProduct?.id,
        title: dbProduct?.getTitle(),
        description: dbProduct?.getDescription(),
        price: dbProduct?.price,
        quantity: dbProduct?.quantity,
        images: dbProduct?.images.map((image) => JSON.parse(image)),
        sizeChartImage: dbProduct?.sizeChartImage,
        sizes: dbProduct?.sizes,
        colours: dbProduct.colours.map((colour) => {
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
        }),
        categories: dbProduct?.categories?.map((category) => {
          return {
            id: category.id,
            ua: category.ua,
            en: category.en,
            rs: category.rs,
            ru: category.ru,
            type: 'category',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
          };
        }),
        reviews: [],
      };
      if (dbProduct.reviews.length !== 0) {
        Product.reviews = dbProduct.reviews.map((review) => {
          return {
            id: review.id,
            name: review.name,
            surname: review.surname,
            review: review.review,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
          };
        });
      }
      return Product;
    } catch (error) {
      this.Logger.error(error);
      throw error;
    }
  }

  async deleteProduct(productId: number): Promise<number> {
    try {
      const existingProduct = await this.productRepository.findByPk(productId, {
        include: { all: true },
      });
      if (!existingProduct) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          PRODUCTS_NOT_FOUND,
        );
      }
      for (const image of existingProduct.images) {
        const file = join(__dirname, 'static' + image);
        unlink(file, (err) => {
          if (err) {
            this.Logger.error(err.message);
          }
        });
      }
      const sizeChartImage = join(
        __dirname,
        'static',
        ...existingProduct.sizeChartImage.split('/'),
      );
      unlink(sizeChartImage, (err) => {
        if (err) {
          this.Logger.error(err.message);
        }
      });
      const folderPath = join(
        __dirname,
        'static',
        ...existingProduct.images[0]
          .split('/')
          .slice(0, existingProduct.images[0].split('/').length - 2),
      );
      const imagesFolder = join(
        __dirname,
        'static',
        ...existingProduct.images[0]
          .split('/')
          .slice(0, existingProduct.images[0].split('/').length - 1),
      );
      const sizeChartImageFolder = join(
        __dirname,
        'static',
        ...existingProduct.sizeChartImage
          .split('/')
          .slice(0, existingProduct.sizeChartImage.split('/').length - 1),
      );
      if (
        readdirSync(imagesFolder).length === 0 &&
        readdirSync(sizeChartImageFolder).length === 0
      ) {
        rmSync(folderPath, { recursive: true, force: true });
      }
      const product = await this.productRepository.destroy({
        where: {
          id: existingProduct?.id,
          quantity: existingProduct?.quantity,
          price: existingProduct?.price,
          sizes: existingProduct?.sizes,
          images: existingProduct?.images,
        },
      });
      return product;
    } catch (error) {
      this.Logger.error(error);
      throw error;
    }
  }

  async deleteImage(filePath: string): Promise<string> {
    try {
      const file = join(__dirname, 'static' + filePath);
      this.Logger.log(file);
      if (!existsSync(file)) {
        throw new ApiException(
          HttpStatus.NOT_FOUND,
          'Not found!',
          FILE_NOT_FOUND,
        );
      }
      unlink(file, (err) => {
        if (err) {
          this.Logger.error(err.message);
        }
      });
      const [productsImages, sizeChartImageProducts] = await Promise.all([
        await this.productRepository.findAll({ where: { images: [filePath] } }),
        await this.productRepository.findAll({
          where: { sizeChartImage: filePath },
        }),
      ]);
      if (productsImages?.length !== 0) {
        for (const product of productsImages) {
          const index = product.images.indexOf(filePath);
          product.images.splice(index, 1);
          await product.save();
        }
      }
      if (sizeChartImageProducts?.length !== 0) {
        for (const product of sizeChartImageProducts) {
          product.sizeChartImage = null;
          await product.save();
        }
      }
      return filePath;
    } catch (error) {
      this.Logger.error(error);
      throw error;
    }
  }

  async findById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
      include: {
        all: true,
      },
    });
    if (!product) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        PRODUCT_NOT_FOUND,
      );
    }
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    const products = await this.productRepository.findAll({
      include: {
        all: true,
      },
    });
    if (!products) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'Not found!',
        PRODUCT_NOT_FOUND,
      );
    }
    return products;
  }
}
