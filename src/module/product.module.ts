import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Product} from "../entities/product.entity";
import {ProductController} from "../controller/product.controller";
import {ProductService} from "../service/product.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    providers: [ProductService],
    controllers: [ProductController]
})
export class ProductModule {}