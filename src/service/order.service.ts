import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderEntity} from "../entities/order.entity";
import {Repository} from "typeorm";
import AddOrderRequest from "../model/order/AddOrderRequest";
import {OrderItemEntity} from "../entities/orderItem.entity";
import {User} from "../entities/user.entity";
import {PaymentEntity} from "../entities/payment.entity";
import {CartEntity} from "../entities/cart.entity";
import {StatusEntity} from "../entities/status.entity";

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity) private orderRepo: Repository<OrderEntity>,
        @InjectRepository(OrderItemEntity) private orderItemRepo: Repository<OrderItemEntity>,
        @InjectRepository(CartEntity) private cartRepo: Repository<CartEntity>
    ) {}

    public async addOrder(rq: AddOrderRequest): Promise<Object> {
        try {
            let cartList = await this.fetchCartList(rq)
            let orderEntity = await this.populateOrderEntity(rq)
            let savedOrderEntity = await this.insertNewOrder(orderEntity)
            let orderItemList = cartList.map(item => this.mapCartEntityToOrderItemEntity(item, savedOrderEntity))
            let savedOrderItemList = await this.insertOrderItemList(orderItemList)
            let userEntity: User = new User()
            userEntity.id = rq.userId
            let deleteCartByUserId = await this.cartRepo.delete({userId: userEntity})
        }

        catch (e) {
            console.error(e)
            return
        }
        return {
            "result": "success!"
        }
    }

    public async updateOrderStatus(orderId: number, statusId: number = 1){
        let existEntity: OrderEntity = await this.orderRepo.findOne(orderId, {relations: ["userId","paymentId", "statusId"]})
        existEntity.statusId = {
            id: statusId,
            name: null
        }
        return await this.orderRepo.update(orderId, existEntity)

    }

    public async insertOrderItemList(orderItemList: Array<OrderItemEntity>) {
        try {
            return  await this.orderItemRepo.save(orderItemList)
        }
        catch (e) {
            return e
        }
    }

    public async insertNewOrder (orderEntity: OrderEntity){
        try {
            return await this.orderRepo.save(orderEntity)
        }
        catch (e) {
            return e
        }
    }

    public async fetchCartList(rq: AddOrderRequest): Promise<Array<CartEntity>>{
        let userEntity: User = new User()
        userEntity.id = rq.userId
        try {
            return await this.cartRepo.find({where: {userId: userEntity}, relations: ["userId", "productId"]})
        }
        catch (e){
            console.log(e)
            return e
        }
    }

    public mapCartEntityToOrderItemEntity(cartEntity: CartEntity, order: OrderEntity): OrderItemEntity {
        let orderItemEntity: OrderItemEntity = new OrderItemEntity()
        orderItemEntity.orderId = order
        orderItemEntity.productId = cartEntity.productId
        orderItemEntity.updatedAt = new Date()
        orderItemEntity.createdAt = new Date()
        orderItemEntity.productQuantity = cartEntity.productQuantity
        return orderItemEntity
    }

    public populateOrderEntity(rq: AddOrderRequest): OrderEntity {
        let orderEntity: OrderEntity = new OrderEntity()
        let userEntity: User = new User()
        userEntity.id = rq.userId
        orderEntity.userId = userEntity
        let paymentEntity: PaymentEntity = new PaymentEntity()
        paymentEntity.id = rq.paymentId
        orderEntity.paymentId = paymentEntity
        orderEntity.total = rq.total
        orderEntity.createdAt = new Date()
        orderEntity.updatedAt = new Date()
        let statusEntity: StatusEntity = new StatusEntity()
        statusEntity.id = 1
        orderEntity.statusId = statusEntity
        return orderEntity
    }
}