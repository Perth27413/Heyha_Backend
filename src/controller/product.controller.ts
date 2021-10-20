import {Body, Controller, Get} from "@nestjs/common";
import {ProductService} from "../service/product.service";
import ProductsRequest from "../model/product/ProductsRequest";
import ProductsResponse from "../model/product/ProductsResponse";

@Controller('api/')
export class ProductController {

    constructor(
        private productService: ProductService
    ) {}

    @Get('products')
    public async products(@Body() productsRequest: ProductsRequest): Promise<ProductsResponse> {
        return this.productService.getProducts(productsRequest)
    }
}