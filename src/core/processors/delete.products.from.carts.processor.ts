import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Job } from 'bull';
import { Cart } from '../../cart/models/cart.model';
import { Product } from '../../product/models/product.model';

@Processor('deleteProductsFromCarts')
export class DeleteProductsFromCarts {
  private readonly logger = new Logger(DeleteProductsFromCarts.name);
  constructor(
    @InjectModel(Product) private readonly productRepository: typeof Product,
    @InjectModel(Cart) private readonly cartRepository: typeof Cart,
  ) {}
  @Process('freshCarts')
  async processNamedJob(job: Job): Promise<any> {
    try {
      const carts = await this.cartRepository.findAll({
        include: { all: true },
      });
      this.logger.warn('JOB started: freashingCarts', job.name);
      this.logger.log(process.cwd());
      // tslint:disable-next-line: await-promise
      for await (const cart of carts) {
        // tslint:disable-next-line: await-promise
        for await (const cartProduct of cart.cartProducts) {
          const product = await this.productRepository.findByPk(
            cartProduct.productId,
          );
          if (!product) {
            cart.$remove('cartProducts', cartProduct.id);
          }
        }
        await cart.save();
      }
      this.logger.log('JOB finished succesfully!', job.name);
      return;
    } catch (err) {
      this.logger.error(err);
      process.exit(1);
    }
  }
}
