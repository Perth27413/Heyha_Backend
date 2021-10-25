import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {OrderService} from "../service/order.service";
import AddOrderRequest from "../model/order/AddOrderRequest";

@Controller('api/')
export class OrderController {

    constructor(
        private orderService: OrderService
    ) {}

    @Post('order')
    public async addOrder(@Body() rq: AddOrderRequest) {
        return this.orderService.addOrder(rq)
    }

    @Get('order/update')
    public async updateOrderStatus(@Query('orderId') orderId: number, @Query('statusId') statusId: number) {
        return this.orderService.updateOrderStatus(orderId, statusId)
    }

    @Get('orderById')
    public async getOrderById(@Query('orderId') orderId: number) {
        return this.orderService.getOrderById(orderId)
    }

}