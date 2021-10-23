import {Controller, Get, Query} from "@nestjs/common";
import CartResponse from "../model/cart/CartResponse";
import {CartService} from "../service/cart.service";

@Controller('api/')
export class CartController {

    constructor(
        private cartService: CartService
    ) {}

    @Get('cartById')
    public async cartById(@Query('id') id: number): Promise<Array<CartResponse>> {
       return this.cartService.getCartByUserId(id)
    }

}