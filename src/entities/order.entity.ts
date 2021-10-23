import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {PaymentEntity} from "./payment.entity";
import {StatusEntity} from "./status.entity";

@Entity({name: "order"})
export class OrderEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.id)
    userId: User

    @Column()
    total: number

    @ManyToOne(() => PaymentEntity, payment => payment.id)
    paymentId: PaymentEntity

    @ManyToOne(() => StatusEntity, status => status.id)
    statusId: StatusEntity

    @Column({name: "created_at"})
    createdAt: Date

    @Column({name: "updated_at"})
    updatedAt: Date
}