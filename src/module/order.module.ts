import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderEntity} from "../entities/order.entity";
import {OrderService} from "../service/order.service";
import {OrderController} from "../controller/order.controller";
import {OrderItemEntity} from "../entities/orderItem.entity";
import {CartEntity} from "../entities/cart.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, CartEntity])
    ],
    providers: [OrderService],
    controllers: [OrderController]
})
export class OrderModule {}