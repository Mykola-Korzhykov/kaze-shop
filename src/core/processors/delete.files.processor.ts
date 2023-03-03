import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Job } from 'bull';
import { existsSync } from 'fs';
import { join } from 'path';
import { Product } from '../../product/models/product.model';

@Processor('garbageColecting')
export class ColectingGarbageFiles {
  private readonly logger = new Logger(ColectingGarbageFiles.name);
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
  ) {}
  @Process('deleteFiles')
  async processNamedJob(job: Job): Promise<any> {
    try {
      this.logger.warn('JOB started: deleting files', job.name);
      this.logger.log(process.cwd());
      const products = await this.productRepository.findAll();
      if (products.length === 0) {
        this.logger.log('JOB finished succesfully!', job.name);
        return;
      }
      // tslint:disable-next-line: await-promise
      for await (const product of products) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < product.images.length; j++) {
          const IMAGE: {
            imagesPaths: string[];
            colour: {
              id: number;
              ua: string;
              en: string;
              rs: string;
              ru: string;
              hex: string;
              type: string;
              createdAt: any;
              updatedAt: any;
            };
            sizes: string[];
          } = JSON.parse(product.images[j]);
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < IMAGE.imagesPaths.length; i++) {
            const file = join(__dirname, 'static' + IMAGE.imagesPaths[i]);
            if (!existsSync(file)) {
              IMAGE.imagesPaths.splice(i, 1);
            }
          }
          product.images[j] = JSON.stringify({
            ...IMAGE,
            imagesPaths: IMAGE.imagesPaths,
          });
          await product.save();
        }
      }
      this.logger.log('JOB finished succesfully!', job.name);
      return;
    } catch (err) {
      this.logger.error(err);
      process.exit(1);
    }
  }
}
