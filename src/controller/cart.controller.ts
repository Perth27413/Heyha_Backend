import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import CartResponse from "../model/cart/CartResponse";
import {CartService} from "../service/cart.service";
import CartRequest from "../model/cart/CartRequest";

@Controller('api/')
export class CartController {

    constructor(
        private cartService: CartService
    ) {}

    @Get('cartById')
    public async cartById(@Query('id') id: number): Promise<Array<CartResponse>> {
       return this.cartService.getCartByUserId(id)
    }

    @Post('cart')
    public async addToCart(@Body() request: CartRequest): Promise<Object> {
        return this.cartService.addProductToCart(request)
    }

    @Post('cart/delete')
    public async deleteProductInCart(@Body() request: CartRequest): Promise<Object> {
        return this.cartService.deleteProductInCart(request)
    }

}