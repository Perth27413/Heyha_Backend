import {Controller, Get} from "@nestjs/common";
import PaymentModel from "../model/payment/PaymentModel";
import {PaymentService} from "../service/payment.service";

@Controller('api/')
export class PaymentController {

    constructor(
        private paymentService: PaymentService

    ) {}

    @Get('payments')
    public async getPayments(): Promise<Array<PaymentModel>> {
        return this.paymentService.getPaymentMethod()
    }

}