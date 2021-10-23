import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "payment"})
export class PaymentEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    method: string

}