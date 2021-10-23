import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CartEntity} from "../entities/cart.entity";
import {CartService} from "../service/cart.service";
import {CartController} from "../controller/cart.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CartEntity])
    ],
    providers: [CartService],
    controllers: [CartController]
})
export class CartModule {}