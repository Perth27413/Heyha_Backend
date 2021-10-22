import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {ProductService} from "../service/product.service";
import ProductsRequest from "../model/product/ProductsRequest";
import ProductsResponse from "../model/product/ProductsResponse";
import ProductModel from "../model/product/ProductModel";

@Controller('api/')
export class ProductController {

    constructor(
        private productService: ProductService
    ) {}

    @Post('products')
    public async products(@Body() productsRequest: ProductsRequest): Promise<ProductsResponse> {
        return this.productService.getProducts(productsRequest)
    }

    @Get('product')
    public async product(@Query("id") id: number): Promise<ProductModel>{
        return this.productService.getProductById(id)
    }

    @Get('productsByCategory')
    public async productsByCategory(@Query("id") id: number): Promise<Array<ProductModel>> {
       return this.productService.getProductsByCategory(id)
    }

}