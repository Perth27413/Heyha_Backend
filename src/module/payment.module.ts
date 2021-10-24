import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PaymentEntity} from "../entities/payment.entity";
import {PaymentService} from "../service/payment.service";
import {PaymentController} from "../controller/payment.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentEntity])
    ],
    providers: [PaymentService],
    controllers: [PaymentController]
})
export class PaymentModule {}