import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "./category.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @ManyToOne(() => Category, category => category.id)
    @JoinColumn({name: 'category'})
    category: Category

    @Column()
    stock: number

    @Column({name: 'image_url'})
    imageUrl: string

    @Column()
    recommend: boolean

    @Column({type: "timestamp"})
    create_date: Date

}