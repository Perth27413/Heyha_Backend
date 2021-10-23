import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {Product} from "./product.entity";

@Entity({name: "cart"})
export class CartEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    userId: User

    @ManyToOne(() => Product, product => product.id)
    productId: Product

    @Column({name: "product_quantity"})
    productQuantity: number

    @Column({name: "created_at"})
    createdAt: Date

    @Column({name: "updated_at"})
    updatedAt: Date
}