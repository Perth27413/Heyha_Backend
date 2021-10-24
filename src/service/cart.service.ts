import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CartEntity} from "../entities/cart.entity";
import {Repository} from "typeorm";
import CartResponse from "../model/cart/CartResponse";
import {User} from "../entities/user.entity";
import ProductModel from "../model/product/ProductModel";
import {Product} from "../entities/product.entity";
import DataNotFoundException from "../Exception/DataNotFoundException";
import {ValidateException} from "../Exception/ValidateException";
import CartRequest from "../model/cart/CartRequest";
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

    public async addProductToCart(request: CartRequest): Promise<Object> {
        console.log("function: addProductToCart")
        let isInsertFail: boolean = await this.insertCartToDB(request) === undefined
        if (isInsertFail) throw new ValidateException("insert fail!")
        return {
            "result": "success!",
        }
    }
    public async insertCartToDB(rq: CartRequest): Promise<any> {
        let cartEntity: CartEntity = new CartEntity();
        let userEntity: User = new User()
        userEntity.id = rq.userId
        cartEntity.userId = userEntity
        let productEntity: Product = new Product()
        productEntity.id = rq.productId
        cartEntity.productId = productEntity
        cartEntity.productQuantity = rq.productQuantity
        cartEntity.updatedAt = new Date()
        cartEntity.createdAt = new Date()
        let existId = await this.cartRepo.findOne({where: {userId: userEntity, productId: productEntity}, relations: ["userId","productId"]})
        if (existId) {
            cartEntity.productQuantity += existId.productQuantity
            return this.cartRepo.save({...existId,...cartEntity})
        }
        return await this.cartRepo.save(cartEntity)
    }

    public mapCartEntityToModel(entity: CartEntity): CartResponse {
        console.log("function: mapCartEntityToModel id =  "+ entity.id)
        return {
            product: this.mapProductEntityToModel(entity.productId),
            productQuantity: entity.productQuantity
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