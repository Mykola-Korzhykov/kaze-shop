import { Injectable, Scope } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesService } from '../categories/categories.service';
import { OwnerService } from '../owner/services/owner.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { Product } from './product.model';
@Injectable({ scope: Scope.TRANSIENT })
export class ProductService {
    constructor(
        @InjectModel(Product) private readonly productRepository: typeof Product,
        private readonly ownerService: OwnerService,
        private readonly categoriesService: CategoriesService
    ) { }
    
    async createProduct(
        createProductDto: CreateProductDto,
        userId: number,
        type: 'OWNER' | 'ADMIN' | null,
        images: Express.Multer.File[],
        sizeChartImage: Express.Multer.File[]
    ) {
        if (!type) {
            throw new UnauthorizedException('User is not authorized to create product!');
        }
        const imagesPaths: string[] = images.map((image: Express.Multer.File) => {
            return image.path.split('\\')
                .slice(image.path.split('\\')
                    .indexOf('static')).join('/'); 
        });
        const sizeChartImagePath = sizeChartImage[0].path
            .split('\\').slice(sizeChartImage[0]
                .path.split('\\').indexOf('static')).join('/');
        const productDto: {      
            title: string;
            description: string;
            price: number;
            sizes: string[];
            colours: string[];
            quantity: number;
            categories: string[];
        } = {
            ...createProductDto,
            colours: new Array(JSON.parse(createProductDto.colours)),
            sizes: new Array(JSON.parse(createProductDto.sizes)),
            categories: new Array(JSON.parse(createProductDto.categories))
        };
        const product = await this.productRepository.create({
            ...productDto,
            images: imagesPaths,
            sizeChartImage: sizeChartImagePath,
        });
        // createProductDto.categories.forEach(async (category: string) => {
        //     const productCategory = await this.categoriesService.getCategoryByValue(category);
        //     await product.$set('categories', productCategory.id);
        //     product.categories.push(productCategory);
        //     await product.save();
        // });
        // if (type && type === 'OWNER') {
        //     product.setOwnerId(userId);
        // }
        // if (type && type === 'ADMIN') {
        //     product.setAdminId(userId);
        // }
        return product;
    }

    async updateProduct(
        updateProductDto: UpdateProductDto,
        images: Express.Multer.File[],
        sizeChartImage: Express.Multer.File[]
    ) {
        const imagesPaths: string[] = images.map((image: Express.Multer.File) => {
            return image.path.split('\\')
                .slice(image.path.split('\\')
                    .indexOf('static')).join('/'); 
        });
        const sizeChartImagePath = sizeChartImage[0].path
            .split('\\').slice(sizeChartImage[0].path
                .split('\\').indexOf('static')).join('/'); 
    }

    async deleteProduct(productId: number) {
        
    }

    async deleteImage(filePath: string) {
        
    }
}
