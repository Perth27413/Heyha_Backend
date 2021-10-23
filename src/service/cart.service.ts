import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../entities/cart.entity";
import {Repository} from "typeorm";
import CartResponse from "../model/cart/CartResponse";
import {User} from "../entities/user.entity";
import ProductModel from "../model/product/ProductModel";
import {Product} from "../entities/product.entity";
import DataNotFoundException from "../Exception/DataNotFoundException";

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>
    ) {}

    public async getCartByUserId(id: number): Promise<Array<CartResponse>> {
        console.log("function: getCartById id = " + id)
        let userEntity: User = new User();
        userEntity.id = id
        let cart = await this.cartRepo.find({where:{userId: userEntity}, relations: ["productId.category","userId", "productId"], order:{id: "ASC"}})
        if (!cart.length) throw new DataNotFoundException
        return cart.map(item => this.mapCartEntityToModel(item))
    }

    public mapCartEntityToModel(entity: CartEntity): CartResponse {
        console.log("function: mapCartEntityToModel id =  "+ entity.id)
        return {
            product: this.mapProductEntityToModel(entity.productId),
            total: entity.productQuantity
        }

    }

    public mapProductEntityToModel(entity: Product): ProductModel {
        console.log("function: mapProductEntityToModel"+ " name = " + entity.name)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            category: entity.category.name,
            stock: entity.stock,
            imageUrl: entity.imageUrl,
            recommend: entity.recommend
        }

    }
}