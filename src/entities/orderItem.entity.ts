import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {OrderEntity} from "./order.entity";
import {Product} from "./product.entity";

@Entity({name: 'order_item'})
export class OrderItemEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Product, product => product.id)
    @JoinColumn({name: 'product_id'})
    productId: Product

    @ManyToOne(() => OrderEntity, order => order.id)
    @JoinColumn({name: 'order_id'})
    orderId: OrderEntity

    @Column({name: "product_quantity"})
    productQuantity: number

    @Column({name: "created_at"})
    createdAt: Date

    @Column({name: "updated_at"})
    updatedAt: Date

}